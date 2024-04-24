const api = {
    isLoggedIn: "/profile/is-logged",
    isRoot: "/profile/is-is-root",
    refresh_token: "token/refresh",
    register: "/register",
    otp: "/verify-otp",
    logout: "/logout",
    login: "/login",
};

export const environment = {
    BACKEND_WS_CHAT: "ws://localhost:8000/ws/chat/",
    BACKEND_URL_AUTH: "http://localhost/api/auth",
    BACKEND_URL: "http://localhost",
    refresh_token: "refresh",
    access_token: "access",
    title: "edSockets",
    user: "user_data",
    production: false,
    api: api,
};