# FROM node:lts-alpine

# # устанавливаем простой HTTP-сервер для статики
# RUN npm install -g http-server

# # делаем каталог 'app' текущим рабочим каталогом
# WORKDIR /whois_client

# # копируем оба 'package.json' и 'package-lock.json' (если есть)
# COPY package*.json ./

# # устанавливаем зависимости проекта
# RUN npm install

# # копируем файлы и каталоги проекта в текущий рабочий каталог (т.е. в каталог 'app')
# COPY . .

# # собираем приложение для production с минификацией
# RUN npm run build

# EXPOSE 8081
# CMD [ "http-server", "dist" ]
# # CMD [ "npm", "run", "serve" ]




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
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 8080

ENTRYPOINT ["nginx","-g","daemon off;"]