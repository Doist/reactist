FROM node:16
FROM mcr.microsoft.com/playwright:focal
RUN apt-get update && apt-get -y install libnss3 libatk-bridge2.0-0 libdrm-dev libxkbcommon-dev libgbm-dev libasound-dev libatspi2.0-0 libxshmfence-dev
 
WORKDIR /app
COPY package.json .
RUN npm install --quiet
