### IMPORTANT NOTE: This Dockerfile is not optimized and over-used resources
### This will be fixed in the near future. If it's not, then we don't have time for this.
### But for now, it does works fine.

FROM node:20-alpine

WORKDIR /app

COPY . .

RUN npm install && npx prisma generate

EXPOSE 3001

CMD ["npx", "ts-node", "--skip-project", "webSocket/server.ts"]