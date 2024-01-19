FROM node:alpine

WORKDIR /src
COPY ./package.json /src
RUN yarn install
COPY . /src

EXPOSE 5050

CMD [ "yarn", "start" ]
