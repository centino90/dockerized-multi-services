FROM node:12-alpine

WORKDIR /app

COPY . .

EXPOSE 9001

CMD npm run start:dev