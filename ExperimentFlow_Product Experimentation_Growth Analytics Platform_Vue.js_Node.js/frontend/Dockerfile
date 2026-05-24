FROM node:18-alpine
WORKDIR /usr/src/app
COPY package.json package-lock.json* ./
RUN npm ci --only=production || true
COPY . .
RUN npm run build || true
CMD ["npx", "serve", "-s", "dist", "-l", "5173"]
