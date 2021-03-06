FROM node:7.9-alpine

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Bundle app source
COPY . /usr/src/app

# Install app dependencies
RUN npm install

EXPOSE 3000
CMD [ "npm", "start" ]
