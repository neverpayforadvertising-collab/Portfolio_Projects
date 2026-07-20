FROM node:20-alpine
WORKDIR /app
COPY package.json package-lock.json* ./
# CHANGED: install ALL deps (previously `npm install --production`, which made
# the next `npm run build` fail because typescript is a devDependency)...
RUN npm install
COPY tsconfig.json ./
COPY src ./src
# CHANGED: ...then build and prune devDeps so the runtime image stays lean.
RUN npm run build && npm prune --omit=dev
EXPOSE 4000
CMD ["npm", "start"]
