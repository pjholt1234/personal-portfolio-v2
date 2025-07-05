# Build stage
FROM node:20-alpine as build

# Set working directory
WORKDIR /app

# Add build arguments
ARG VITE_BACKEND_URL
ARG VITE_API_URL
ENV VITE_BACKEND_URL=$VITE_BACKEND_URL
ENV VITE_API_URL=$VITE_API_URL

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

# Enable mod_rewrite
RUN sed -i '/LoadModule rewrite_module/s/^#//g' /usr/local/apache2/conf/httpd.conf && \
    sed -i 's/AllowOverride None/AllowOverride All/g' /usr/local/apache2/conf/httpd.conf

# Copy virtual host configuration
COPY vhost.conf /usr/local/apache2/conf.d/
RUN echo "Include conf.d/*.conf" >> /usr/local/apache2/conf/httpd.conf

# Copy built assets from build stage
COPY --from=build /app/dist /usr/local/apache2/htdocs/

# Copy .htaccess file
COPY .htaccess /usr/local/apache2/htdocs/

# Expose port 80
EXPOSE 80

# Start Apache
CMD ["httpd-foreground"] 