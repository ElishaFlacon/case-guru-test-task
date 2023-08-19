FROM node:18.17-alpine

WORKDIR /app/server

COPY package*.json ./

RUN npm install

COPY . ./server

CMD [ "npm", "start" ]