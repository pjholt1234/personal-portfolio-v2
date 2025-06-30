#!/bin/bash

# Load environment variables
if [ -f ".env" ]; then
    set -a  # automatically export all variables
    source .env
    set +a
    
    # Debug: Print loaded configuration
    echo "Loaded configuration:"
    echo "REMOTE_USER: $REMOTE_USER"
    echo "REMOTE_HOST: $REMOTE_HOST"
    echo "REMOTE_PATH: $REMOTE_PATH"
    echo "LOCAL_PATH: $LOCAL_PATH"
else
    echo "Error: .env file not found"
    exit 1
fi

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
rsync -av -e "ssh -i $SSH_KEY_LOCATION" \
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
    
    rsync -av -e "ssh -i $SSH_KEY_LOCATION" \
        "$REMOTE_USER@$REMOTE_HOST:$REMOTE_PATH/$DB_PATH" \
        "$LOCAL_PATH/$DB_PATH"
fi

# Set proper permissions for local development
echo "🔒 Setting permissions..."
chmod -R 775 "$LOCAL_PATH/$STORAGE_PATH" "$LOCAL_PATH/database"

echo "✅ Sync to local complete!" 