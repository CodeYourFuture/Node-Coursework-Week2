FROM node:14-alpine

COPY server.js .
COPY package.json .
COPY package-lock.json .
COPY index.html .

RUN npm ci

CMD ["npm","start"]