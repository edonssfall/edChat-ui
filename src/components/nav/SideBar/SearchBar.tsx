import {useWebSocketContext} from "../../../services/websocket.context.tsx";
import {Input, Stack} from "@chakra-ui/react";
import {useEffect, useState} from "react";

interface ISearchUser {
    id?: string;
    username: string;
}

interface ISearchResponse {
    users: ISearchUser[]
}

function SearchBarComponent() {
    const [search, setSearch] = useState('');
    const {sendJsonMessage, lastJsonMessage, getWebSocket} = useWebSocketContext();

    useEffect(() => {
        let timeoutId: NodeJS.Timeout;

        if (search) {
            timeoutId = setTimeout(() => {
                sendJsonMessage({search_query: search});
            }, 2000);
        } else {
            getWebSocket()?.close();
        }
        return () => clearTimeout(timeoutId);
    }, [search]);

    useEffect(() => {
        if (lastJsonMessage){
            const message: ISearchResponse = lastJsonMessage as ISearchResponse;
            console.log(message.users[0]);
        }
    }, [lastJsonMessage]);

  return (
    <Stack>
      <Input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search..."
      />
    </Stack>
  );
}

export default SearchBarComponent;
