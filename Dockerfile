FROM node:alpine AS build

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY . .

COPY prisma ./prisma

RUN npx prisma generate

RUN npm run build

CMD ["npm", "run", "dev"]
