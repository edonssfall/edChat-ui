const api = {
    password_reset: '/password-reset',
    refresh_token: '/token/refresh',
    password_set: '/password-set',
    register: '/signup',
    otp: '/verify-otp',
    logout: '/logout',
    login: '/login',
    user: '/user',
};

export const environment = {
    BACKEND_WS_CHAT: 'ws://localhost:8000/ws/chat/',
    BACKEND_URL_AUTH: 'http://localhost/api/auth',
    BACKEND_URL: 'http://localhost',
    refresh_token: 'refresh',
    saveToken: 'saveToken',
    access_token: 'access',
    chat_user: 'chat_user',
    accessTokenLive: 15,
    refreshTokenLive: 2,
    title: 'edSockets',
    user: 'user_data',
    production: false,
    api: api,
};