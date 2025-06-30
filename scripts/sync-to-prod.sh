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

echo "🚀 Starting sync to production..."

# Ensure remote directories exist
ssh -i "$SSH_KEY" "$REMOTE_USER@$REMOTE_HOST" "mkdir -p $REMOTE_PATH/$STORAGE_PATH/app/public $REMOTE_PATH/$STORAGE_PATH/framework/{cache,sessions,views} $REMOTE_PATH/$STORAGE_PATH/logs $REMOTE_PATH/database"

# Sync storage directory
echo "📁 Syncing storage files..."
rsync -av -e "ssh -i $SSH_KEY" \
    "$LOCAL_PATH/$STORAGE_PATH/" \
    "$REMOTE_USER@$REMOTE_HOST:$REMOTE_PATH/$STORAGE_PATH/"

# Sync database if requested
if [ "$include_db" = true ]; then
    echo "🗄️  Syncing database..."
    rsync -av -e "ssh -i $SSH_KEY" \
        "$LOCAL_PATH/$DB_PATH" \
        "$REMOTE_USER@$REMOTE_HOST:$REMOTE_PATH/$DB_PATH"
fi

# Set proper permissions
echo "🔒 Setting permissions..."
ssh -i "$SSH_KEY" "$REMOTE_USER@$REMOTE_HOST" "sudo chown -R www-data:www-data $REMOTE_PATH/$STORAGE_PATH $REMOTE_PATH/database && sudo chmod -R 775 $REMOTE_PATH/$STORAGE_PATH $REMOTE_PATH/database"

echo "✅ Sync to production complete!" 