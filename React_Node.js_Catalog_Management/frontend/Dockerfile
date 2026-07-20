# CHANGED: new file — docker-compose referenced ./frontend/Dockerfile but it
# did not exist (only a stale root-level Dockerfile.frontend).
FROM node:20-alpine
WORKDIR /app
COPY package.json package-lock.json* ./
# CHANGED: full install (not --production) because tsc/vite are devDependencies
# required by `npm run build`.
RUN npm install
COPY tsconfig.json tsconfig.node.json vite.config.ts index.html ./
COPY public ./public
COPY src ./src
# CHANGED: Vite env vars are baked in at BUILD time, so they arrive as build args.
ARG VITE_API_BASE_URL
ARG VITE_API_KEY
ENV VITE_API_BASE_URL=$VITE_API_BASE_URL
ENV VITE_API_KEY=$VITE_API_KEY
RUN npm run build
EXPOSE 4173
CMD ["npm", "run", "serve"]
