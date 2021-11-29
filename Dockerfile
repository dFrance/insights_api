FROM node:16-alpine

WORKDIR /usr/app
COPY package.json yarn.lock ./

RUN npm install

COPY . .

EXPOSE 8081
CMD ["yarn", "dev"]