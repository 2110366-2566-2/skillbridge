FROM node:20

WORKDIR /app

COPY . .

RUN npm install

# ARG NEXTAUTH_URL
# ARG NEXTAUTH_SECRET

# RUN echo "NEXTAUTH_URL=${NEXTAUTH_URL}" > .env \
#     && echo "NEXTAUTH_SECRET=${NEXTAUTH_SECRET}" >> .env 

RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]