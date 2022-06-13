FROM node:12-alpine

WORKDIR /app

EXPOSE 9001

CMD npm run start:dev