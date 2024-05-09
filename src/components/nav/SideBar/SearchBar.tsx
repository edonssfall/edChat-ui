import {environment} from "../../../services/environment.ts";
import useWebSocket from "react-use-websocket";
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
    const { sendJsonMessage, lastJsonMessage, readyState, getWebSocket } = useWebSocket(
        `${environment.BACKEND_WS_CHAT}/search`,
        {
            share: false,
            shouldReconnect: () => true,
        }
    );

    useEffect(() => {
        let timeoutId: NodeJS.Timeout;

        if (search) {
            if (readyState === 1) {
                timeoutId = setTimeout(() => {
                    sendJsonMessage({search_query: search});
                }, 2000);
            }
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
