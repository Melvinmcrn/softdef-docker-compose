FROM node:12.18.4-alpine3.12

COPY package.json ./
RUN yarn install --silent

COPY . ./

EXPOSE 3000
# ENV SERVER_ENDPOINT http://server:8000
CMD ["yarn", "start"]