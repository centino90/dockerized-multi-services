FROM node:12-alpine

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

EXPOSE 9000

CMD npm start