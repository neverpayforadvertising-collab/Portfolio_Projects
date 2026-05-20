FROM node:20-alpine
WORKDIR /app
COPY package.json package-lock.json* ./
COPY tsconfig.json ./
COPY src ./src
COPY .env.example ./
RUN npm install --production
RUN npm run build
EXPOSE 4000
CMD ["npm", "start"]
