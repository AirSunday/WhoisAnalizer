FROM node:12-alpine
WORKDIR /whois_server
COPY package*.json ./
RUN npm install  
COPY . .
EXPOSE 8080
CMD npm start