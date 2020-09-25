FROM node:lts-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm ci 

COPY . .

RUN npm run build

FROM nginx:1.19-alpine as serve
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80