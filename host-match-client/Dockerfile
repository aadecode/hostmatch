FROM node:14.17.5

WORKDIR /ui

ENV PATH="./node_modules/.bin:$PATH"

COPY package.json .

RUN npm install

RUN npm rebuild node-sass

COPY . .

EXPOSE 3000

CMD [ "npm", "start" ]