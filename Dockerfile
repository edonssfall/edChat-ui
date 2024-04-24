FROM node:20.1

WORKDIR /web

COPY . .

RUN npm install --force
