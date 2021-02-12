FROM node:14-alpine3.12 As builder

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

FROM node:14-alpine3.12 as production
WORKDIR /usr/src/app
COPY --from=builder /usr/src/app ./

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}
CMD ["npm", "run", "start:prod"]


