import {IChat} from "../interfaces/chat.interface.ts";
import {environment} from "./environment.ts";

export function createIChat(name: string): IChat {
    return {
        name: name,
        path: environment.BACKEND_WS_CHAT + name,
    }
}
