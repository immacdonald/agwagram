# Build React static files
FROM node:20 as build

WORKDIR /app/frontend
COPY ./agwagram/package.json ./
COPY ./agwagram/package-lock.json ./
RUN npm ci --silent
COPY ./agwagram/ ./
RUN npm run build

# Copy React static files and start nginx
FROM nginx:stable-alpine
COPY --from=build /app/frontend/dist /usr/share/nginx/html
CMD ["nginx", "-g", "daemon off;"]