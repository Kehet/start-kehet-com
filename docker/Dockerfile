FROM node:21-alpine as build

WORKDIR /app
COPY ../ /app

RUN npm install && npm run build

FROM nginx:stable-alpine as serve

LABEL org.opencontainers.image.source="https://github.com/Kehet/start-kehet-com"
LABEL org.opencontainers.image.description="start.kehet.com"
LABEL org.opencontainers.image.licenses="GPL-3.0"

COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
