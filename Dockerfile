FROM nginx:1.17.1-alpine
COPY nginx-config.conf /etc/nginx/nginx.conf
COPY /dist/our-first-app2 /usr/share/nginx/html