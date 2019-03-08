FROM node:9.6.1

MAINTAINER Leandro Akio Hossaka <le.akio@gmail.com>

RUN mkdir /usr/src/app
WORKDIR /usr/src/app

RUN cd /usr/src/app
#RUN git clone https://github.com/leandrohossaka/angular_app_docker
#RUN cd angular_app_docker

ENV PATH /usr/src/app/node_modules/.bin:$PATH

COPY package.json /usr/src/app/package.json
RUN npm install
RUN npm install -g @angular/cli@1.7.1

COPY . /usr/src/app

CMD ng serve --host 0.0.0.0
