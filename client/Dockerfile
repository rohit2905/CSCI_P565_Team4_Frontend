FROM node:20-alpine

WORKDIR /usr/src/app

COPY package*.json .

RUN npm install --legacy-peer-deps

COPY ./src ./src

EXPOSE 5173

CMD npm start