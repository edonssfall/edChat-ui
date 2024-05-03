import {environment} from "./environment.ts";

export function setUser(user: string) {
    localStorage.setItem(environment.user, JSON.stringify(user))
}
