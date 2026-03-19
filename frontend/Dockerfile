# Stage 1: Build the Angular application
FROM node:20-alpine AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npm run build

# Stage 2: Serve the application purely on the client side (CSR)
FROM node:20-alpine
WORKDIR /app

# Install the lightweight static server 'serve'
RUN npm install -g serve

# Copy ONLY the browser build (no SSR server files required anymore)
COPY --from=build /app/dist/frontend/browser ./browser

EXPOSE 80

# Serve the browser folder and redirect all 404s to index.html for Angular routing
CMD ["serve", "-s", "browser", "-l", "80"]
