import { Box, Button, Flex, Input, InputGroup, InputRightElement, Stack, Text } from '@chakra-ui/react';
import { ISearchResponse, ISearchUser } from '../../../interfaces/sidebar.interface.ts';
import { useWebSocketContext } from '../../../context/websocket.context.tsx';
import { setChat } from '../../../store/slices/chat.slice.ts';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';


/**
 * @name SearchBarComponent
 * @description component: SearchBarComponent
 */
function SearchBarComponent() {
  const [search, setSearch] = useState(''),
    dispatch = useDispatch(),
    [searchResults, setSearchResults] = useState<ISearchUser[]>([]),
    [isSearching, setIsSearching] = useState<boolean>(false),
    { sendJsonMessage, lastJsonMessage, getWebSocket } = useWebSocketContext();

  /**
     * @name useEffect
     * @description This function is used to set the initial states.
     */
  useEffect(() => {
    setIsSearching(true);
    let timeoutId: NodeJS.Timeout;

    if (search) {
      timeoutId = setTimeout(() => {
        sendJsonMessage({ search_query: search });
      }, 2000);
    } else {
      getWebSocket()?.close();
    }

    return () => clearTimeout(timeoutId);
  }, [search]);

  /**
     * @name useEffect
     * @description This function is used to set the initial states. And also to set the search results.
     */
  useEffect(() => {
    if (lastJsonMessage) {
      if ((lastJsonMessage as ISearchResponse).users !== undefined) {
        const users = (lastJsonMessage as ISearchResponse).users;
        if (users) {
          setSearchResults(users);
        }
      } else if ((lastJsonMessage as ISearchResponse).room_uuid !== undefined) {
        const room_uuid = (lastJsonMessage as ISearchResponse).room_uuid;
        if (room_uuid) {
          dispatch(setChat(room_uuid));
          handleClear();
        }
      }

    }
    setIsSearching(false);
  }, [lastJsonMessage]);

  /**
     * @name handleClear
     * @description This function is used to clear the search.
     */
  const handleClear = () => {
    setSearch('');
    setSearchResults([]);
  };

  return (
    <Stack>
      <Flex alignItems="center">
        <InputGroup>
          <Input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search..."
            w="full"
          />
          {search.length > 0 && (
            <InputRightElement width="4.5rem">
              <Button h="1.75rem" size="sm" onClick={handleClear}>
                                X
              </Button>
            </InputRightElement>
          )}
        </InputGroup>
      </Flex>

      {search.length > 0 && !isSearching  && (
        <Box
          bg="white"
          border="1px solid #ddd"
          borderRadius="md"
          p={2}
          w="full"
          boxShadow="md"
        >
          {searchResults.length === 0 ? (
            <Text>No results found</Text>
          ) : (
            searchResults.map((result) => (
              <Text
                key={result.id}
                cursor="pointer"
                _hover={{ bg: '#ddd' }}
                onClick={() => sendJsonMessage({ chat: result.username })}
              >
                {result.username}
              </Text>
            ))
          )}
        </Box>
      )}
    </Stack>
  );
}

export default SearchBarComponent;
