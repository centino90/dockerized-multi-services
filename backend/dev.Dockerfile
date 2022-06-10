FROM node:12-alpine

WORKDIR /app

COPY . .

EXPOSE 9000

CMD npm run start:dev