FROM node:17-alpine3.14
WORKDIR /modules
COPY package.json package.json
RUN  yarn install && yarn global add umi