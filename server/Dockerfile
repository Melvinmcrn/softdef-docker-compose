FROM node:12.18.4-alpine3.12

COPY package.json ./
RUN yarn install
RUN yarn add react-scripts -g

COPY . ./

EXPOSE 8000
ENV DB_ENDPOINT db
CMD ["node", "index.js"]