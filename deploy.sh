#!/bin/bash

# Stop and remove existing containers
docker compose -f docker-compose.prod.yml down

# Pull latest changes
git pull

# Rebuild and start containers
docker compose -f docker-compose.prod.yml up -d --build

# Create storage link in backend container
docker compose -f docker-compose.prod.yml exec backend php artisan storage:link

# Set correct permissions for storage directory
docker compose -f docker-compose.prod.yml exec backend chown -R www-data:www-data /var/www/html/storage
docker compose -f docker-compose.prod.yml exec backend chmod -R 775 /var/www/html/storage

# Clear Laravel cache
docker compose -f docker-compose.prod.yml exec backend php artisan cache:clear
docker compose -f docker-compose.prod.yml exec backend php artisan config:cache
docker compose -f docker-compose.prod.yml exec backend php artisan route:cache 