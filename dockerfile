FROM node:16
WORKDIR /usr/src/serverapp
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 5000
CMD [ "npm", "run", "dev" ]