FROM node:20

WORKDIR /app

COPY . .

RUN npm install

ARG DATABASE_URL

RUN echo "DATABASE_URL=${DATABASE_URL}" > .env 

RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]