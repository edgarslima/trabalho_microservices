FROM node

MAINTAINER Edgar Lima <edgarslima@gmail.com>

RUN mkdir /usr/src/app
WORKDIR /usr/src/app

RUN cd /usr/src/app

ENV PATH /usr/src/ap/node_mdules/.bin:$PATH

COPY package.json /usr/src/app/package.json
RUN npm install

COPY . /usr/src/app 

CMD node app.js
