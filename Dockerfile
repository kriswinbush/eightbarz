FROM node:11.14.0 as build-stage

WORKDIR /app

COPY package*.json /app/

RUN npm install

COPY ./ /app/

RUN npm run build

FROM node:11.14.0

WORKDIR /server

COPY /server/package*.json /server/

RUN npm install

COPY /server /server/

COPY --from=build-stage /app/dist/ /server/dist/

CMD ["npm", "start"]