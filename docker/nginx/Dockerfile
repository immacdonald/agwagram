# Build React static files
FROM docker.io/library/node:20 as build

WORKDIR /app/frontend
COPY ./app/package.json ./
COPY ./app/package-lock.json ./
RUN npm ci --silent
COPY ./app/ ./
RUN npm run build

# Copy React static files and start nginx
FROM docker.io/library/nginx:stable-alpine

COPY --from=build /app/frontend/dist /usr/share/nginx/html/tools/agwagram
COPY docker/nginx/default.conf.template /etc/nginx/templates/default.conf.template
