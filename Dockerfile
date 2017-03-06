FROM node:7.6
# author
MAINTAINER guru <guru@zhehekeji.com>

COPY ./package.json /tmp/package.json
RUN  npm i --production -verbose

COPY ./ /node-guru
WORKDIR /node-guru
RUN mv /tmp/node_modules /node-guru

CMD node  app.js
