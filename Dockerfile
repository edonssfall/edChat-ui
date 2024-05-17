FROM node:21.6.2
LABEL authors="edonssfall"

WORKDIR /web

COPY . .

RUN npm install