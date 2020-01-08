# docker.webpack
FROM node:12-alpine as base

WORKDIR /app/

FROM base as prereq

COPY yarn.lock ./
COPY package*.json ./

RUN yarn

FROM prereq as development

EXPOSE 8080

CMD ["yarn", "serve"]