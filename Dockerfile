# Start from the Official Image with Node 14 on Alpine Linux 3.14. 
FROM node:14-alpine3.14

# Copy the package.json file to the container image
COPY package.json package-lock.json ./

# Copy the components of my program to the container image
COPY server.js .
COPY routes routes

# Install the dependencies
RUN npm ci

# Bundle app source
COPY . .

# Tell Docker that on startup, the container should run the "npm start" command, which will start the server.
CMD [ "npm", "start" ]


## This Dockerfile contains the instruction for Docker to build an Image. To actually build you can run the command:
## docker build -t "my-first-node-server" .
## Where `docker build` is the command to build an image, and `my-first-node-server` is the name of the image, also known as the tag.
## the `.` is the current directory - this tell Docker to look for the Dockerfile in the current directory. 
