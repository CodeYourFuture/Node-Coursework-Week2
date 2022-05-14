FROM node:14-alpine

COPY . .

RUN npm ci

CMD "npm","start"