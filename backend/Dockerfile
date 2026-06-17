FROM node:20-alpine

WORKDIR /app

# Copy root package.json to resolve the "file:.." local package reference
COPY package.json ./

# Copy backend configuration
WORKDIR /app/backend
COPY backend/package*.json ./

# Install only production dependencies
RUN npm ci --omit=dev

# Copy backend source code
COPY backend/index.js ./

EXPOSE 8080

CMD ["npm", "start"]
