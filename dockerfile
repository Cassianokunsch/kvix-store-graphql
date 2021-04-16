FROM node:12.14.0-alpine as build
WORKDIR /build
COPY . .
RUN yarn
RUN yarn build

FROM node:12.14.0-alpine as pre-release
WORKDIR /pre-release
COPY --from=build ./build/dist ./dist
COPY package.json .
RUN yarn --prod

FROM node:12.14.0-alpine as release
WORKDIR /release
COPY --from=pre-release ./pre-release .
COPY start.sh .
CMD [ "sh", "start.sh" ]
