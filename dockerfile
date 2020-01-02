FROM node:12.13.0-alpine as package
WORKDIR /package
COPY package.json .
RUN yarn

FROM node:12.13.0-alpine as app
WORKDIR /app
COPY --from=package ./package .
COPY . .
CMD [ "sh", "start.sh" ]