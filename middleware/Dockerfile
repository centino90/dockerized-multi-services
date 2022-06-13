FROM node:12-alpine

WORKDIR /app

COPY package.json /app

RUN npm install

COPY . /app

EXPOSE 9001

CMD npm start