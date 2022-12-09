# Stage 1 - Build React App inside temporary Node container
FROM node:lts-alpine as build-stage

WORKDIR /whois_client
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Stage 2 - Deploy with NGNIX
FROM nginx:1.15.2-alpine

COPY --from=build-stage /whois_client/dist /var/www
COPY dockerConf/nginx.conf /etc/nginx/nginx.conf
COPY dockerConf/whoisa.rsa /etc/nginx
COPY dockerConf/whoisa.crt /etc/nginx

EXPOSE 8080

ENTRYPOINT ["nginx","-g","daemon off;"]
