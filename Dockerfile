FROM node:16.17.0-alpine

WORKDIR /server

COPY ./package.json .

RUN npm install

COPY . .

EXPOSE 8081

CMD npm start