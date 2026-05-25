FROM node:18-alpine AS base
WORKDIR /usr/src/app

FROM base AS deps
COPY package.json package-lock.json* ./
RUN npm ci --omit=dev

FROM base AS builder
COPY --from=deps /usr/src/app/node_modules ./node_modules
COPY . .
RUN npm run prisma:generate || true
RUN npm run build

FROM node:18-alpine AS runner
WORKDIR /usr/src/app
ENV NODE_ENV=production
COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY --from=builder /usr/src/app/dist ./dist
COPY package.json ./
EXPOSE 3000
CMD ["node", "dist/main.js"]
