FROM node:0.12.7

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY . /usr/src/app

RUN npm install
RUN npm run build-bwr
RUN npm run build

COPY . /usr/src/app

EXPOSE 3000

CMD ["npm", "start"]
