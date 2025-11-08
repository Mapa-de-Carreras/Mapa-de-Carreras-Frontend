# --- Etapa 1: Build ---

FROM node:22-alpine AS build
WORKDIR /app
COPY package.json /app/
RUN npm install

COPY . .
RUN npm run build

# --- Etapa 2: Servir la App ---

FROM nginx:1.27
COPY nginx.conf /etc/nginx/conf.d/default.conf  
COPY --from=build /app/dist /usr/share/nginx/html/mapa2025
COPY env.sh /docker-entrypoint.d/env.sh
RUN chmod +x /docker-entrypoint.d/env.sh
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]