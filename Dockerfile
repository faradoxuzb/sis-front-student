### STAGE 1: Build ###
FROM node:18.20.4-alpine AS build
WORKDIR /app
COPY package*.json default.conf ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:stable
COPY --from=build /app/default.conf /etc/nginx/conf.d
COPY --from=build /app/dist/fuse/browser/ /usr/share/nginx/html
EXPOSE 80

