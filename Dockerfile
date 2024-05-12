FROM node:20-alpine


WORKDIR /home/node/app
COPY package*.json ./
COPY tsconfig.json ./
COPY . .
RUN npm install
RUN npm run tsc
EXPOSE 3000
CMD [ "node", "build/index.js" ]
