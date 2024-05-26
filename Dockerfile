FROM node:21.6.2 AS build
LABEL authors="edonssfall"

WORKDIR /web

COPY . .

RUN npm install

COPY .env.production .env.production

RUN npm run build -- --mode production

FROM nginx:alpine

COPY ./nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=build /web/build /usr/share/nginx/html/chats
