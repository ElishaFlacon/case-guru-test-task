FROM node:18.17-alpine

WORKDIR /app/client

COPY package*.json ./

RUN npm install

COPY . ./client

CMD [ "npm", "start" ]