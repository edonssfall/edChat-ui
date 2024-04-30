import {environment} from "../environments/environment.ts";
import {IChat} from "../interfaces/chat.interface.ts";

export function createIChat(name: string): IChat {
    return {
        name: name,
        path: environment.BACKEND_WS_CHAT + name,
    }
}
