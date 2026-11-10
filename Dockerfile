FROM node:22-alpine
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --omit=dev
COPY bin ./bin
COPY src ./src
ENTRYPOINT ["node", "bin/escapebase44-mcp.js"]
