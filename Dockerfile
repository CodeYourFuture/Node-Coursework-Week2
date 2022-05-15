# Start from the Official Image with Node 14 on Alpine Linux 14.
FROM node:14-alpine3.14

# Copy all the files we need 
COPY package.json .
COPY package-lock.json .
COPY server.js .
COPY index.html .


RUN npm ci

CMD [ "npm", "start"]

#create new branch for dockerfile deployment
#switch to correct branch
#sudo docker build -t "my-first-chat-server" .
#sudo docker tag my-first-chat-server:latest dockercode110/node-chat-server:latest
#sudo docker push dockercode110/node-chat-server:latest
#sudo docker login
#sudo docker push dockercode110/node-chat-server:latest