FROM node:20

WORKDIR /src

COPY package*.json ./

RUN rm -rf node_modules package-lock.json

RUN npm install --force

COPY . .

EXPOSE 5173

CMD ["npm", "run", "dev"]