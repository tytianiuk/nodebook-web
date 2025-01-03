FROM node:18

WORKDIR /app

COPY package*.json ./

RUN npm install --no-cache

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]