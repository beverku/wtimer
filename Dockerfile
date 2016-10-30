FROM node:6.9.1

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json /usr/src/app/
RUN npm install
RUN npm install -g bower

# Bundle app source
COPY . /usr/src/app

EXPOSE 8000
CMD [ "npm", "start" ]
