FROM node:18.12.1-slim

WORKDIR /app/server

COPY package*.json ./

RUN npm install

COPY . .

ENTRYPOINT [ "npm", "run" ]

CMD [ "start" ]