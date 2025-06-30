#!/bin/bash

# Configuration
REMOTE_USER="ubuntu"
REMOTE_HOST="13.51.170.162"
SSH_KEY="/Users/paul-ho/Downloads/pjs-key.pem"
REMOTE_PATH="/home/ubuntu/backend"
LOCAL_PATH="./backend"
STORAGE_PATH="storage"
DB_PATH="database/database.sqlite"

# Function to show usage
usage() {
    echo "Usage: $0 [-d]"
    echo "  -d    Include database sync (optional)"
    exit 1
}

# Parse command line options
include_db=false
while getopts "d" opt; do
    case $opt in
        d) include_db=true ;;
        *) usage ;;
    esac
done

echo "🚀 Starting sync to local..."

# Ensure local directories exist
mkdir -p "$LOCAL_PATH/$STORAGE_PATH/app/public" \
    "$LOCAL_PATH/$STORAGE_PATH/framework/cache" \
    "$LOCAL_PATH/$STORAGE_PATH/framework/sessions" \
    "$LOCAL_PATH/$STORAGE_PATH/framework/views" \
    "$LOCAL_PATH/$STORAGE_PATH/logs" \
    "$LOCAL_PATH/database"

# Sync storage directory
echo "📁 Syncing storage files..."
rsync -av -e "ssh -i $SSH_KEY" \
    "$REMOTE_USER@$REMOTE_HOST:$REMOTE_PATH/$STORAGE_PATH/" \
    "$LOCAL_PATH/$STORAGE_PATH/"

# Sync database if requested
if [ "$include_db" = true ]; then
    echo "🗄️  Syncing database..."
    # Backup existing local database
    if [ -f "$LOCAL_PATH/$DB_PATH" ]; then
        mv "$LOCAL_PATH/$DB_PATH" "$LOCAL_PATH/$DB_PATH.backup"
        echo "📦 Local database backed up to database.sqlite.backup"
    fi
    
    rsync -av -e "ssh -i $SSH_KEY" \
        "$REMOTE_USER@$REMOTE_HOST:$REMOTE_PATH/$DB_PATH" \
        "$LOCAL_PATH/$DB_PATH"
fi

# Set proper permissions for local development
echo "🔒 Setting permissions..."
chmod -R 775 "$LOCAL_PATH/$STORAGE_PATH" "$LOCAL_PATH/database"

echo "✅ Sync to local complete!" 