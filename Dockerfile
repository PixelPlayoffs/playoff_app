FROM nginx:1.11.10-alpine
WORKDIR /usr/share/nginx/html
COPY ./build .

# this works great