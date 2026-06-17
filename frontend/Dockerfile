# Stage 1: Build Vite + TypeScript SPA
FROM node:20-alpine AS builder

WORKDIR /app

# Copy root package.json to resolve "file:.." workspace dependency
COPY package.json ./

# Copy frontend config
WORKDIR /app/frontend
COPY frontend/package*.json ./

# Install frontend dependencies (including devDependencies like tsc and vite)
RUN npm ci

# Copy frontend source code
COPY frontend/tsconfig.json ./
COPY frontend/index.html ./
COPY frontend/public ./public/
COPY frontend/src ./src/

# Build static assets (runs tsc and vite build)
RUN npm run build

# Stage 2: Web Server
FROM nginx:stable-alpine

# Copy compiled assets from Stage 1 builder
COPY --from=builder /app/frontend/dist /usr/share/nginx/html

# Replace default Nginx configuration
COPY frontend/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
