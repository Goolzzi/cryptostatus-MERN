FROM node:7-alpine

RUN mkdir /app
WORKDIR /app

COPY package.json /app/package.json
RUN npm install --quiet

COPY . /app

EXPOSE 8000

