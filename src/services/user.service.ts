import {environment} from "../environments/environment.ts";

export function setUser(user: string) {
    localStorage.setItem(environment.user, JSON.stringify(user))
}
