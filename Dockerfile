# pull the official base image
FROM node:14.9

# set working directory
WORKDIR /usr/src/app

# install app dependencies
COPY package.json ./
COPY package-lock.json ./

RUN npm install --silent

COPY . .

EXPOSE 3001

CMD ["npm", "start"]