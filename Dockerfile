FROM node:16
WORKDIR /app
RUN npm install -g http-server
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 8081
CMD ["http-server", "-p", "8081", "/app"]
