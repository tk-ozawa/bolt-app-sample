FROM node:14.9.0-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN apk update && \
  npm install -g npm && \
  npm install

COPY . .