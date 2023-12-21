FROM node:alpine

WORKDIR /src
COPY ./package.json /src/
RUN yarn install --production
COPY .  /src

EXPOSE 5050

CMD [ "node", "index.js" ]
