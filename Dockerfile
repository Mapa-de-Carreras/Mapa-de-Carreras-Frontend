# --- Etapa 1: Build ---

FROM node:22-alpine AS build
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# --- Etapa 2: Servir la App ---

FROM nginx:1.28.0-alpine
COPY --from=build /usr/src/app/dist/ /usr/share/nginx/html
COPY --from=build /usr/src/app/nginx.conf /etc/nginx/conf.d/default.conf}
EXPOSE 80