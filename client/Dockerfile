FROM node:18-alpine

WORKDIR /app
COPY ./package.json /app/
RUN yarn install --production

COPY .  /app

EXPOSE 3000

CMD [ "yarn", "dev" ]
