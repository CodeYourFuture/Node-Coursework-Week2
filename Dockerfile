FROM node:14-alpine3.14

COPY package.json .
COPY package-lock.json .
COPY server.js .
COPY routes routes
RUN npm ci

CMD ["npm", "start"]