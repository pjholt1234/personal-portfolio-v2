# Build stage
FROM node:20-alpine as build

# Set working directory
WORKDIR /app

# Add build arguments
ARG VITE_BACKEND_URL
ENV VITE_BACKEND_URL=$VITE_BACKEND_URL

# Increase Node.js memory limit
ENV NODE_OPTIONS="--max-old-space-size=4096"

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy application files
COPY . .

# Build the application
RUN npm run build

# Production stage
FROM httpd:2.4-alpine

# Copy built assets from build stage
COPY --from=build /app/dist /usr/local/apache2/htdocs/

# Expose port 80
EXPOSE 80

# Start Apache
CMD ["httpd-foreground"] 