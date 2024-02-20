FROM node:20-alpine

WORKDIR .

COPY package*.json .

RUN npm install --legacy-peer-deps

COPY . .

EXPOSE 5173

CMD npm start