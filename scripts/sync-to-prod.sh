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
    echo "SSH_KEY_LOCATION: $SSH_KEY_LOCATION"
else
    echo "Error: .env file not found"
    exit 1
fi

# Validate SSH key exists and has correct permissions
if [ ! -f "$SSH_KEY_LOCATION" ]; then
    echo "Error: SSH key not found at $SSH_KEY_LOCATION"
    exit 1
fi

if [ ! -r "$SSH_KEY_LOCATION" ]; then
    echo "Error: SSH key is not readable. Please check permissions."
    exit 1
fi

# Test SSH connection
echo "🔐 Testing SSH connection..."
if ! ssh -i "$SSH_KEY_LOCATION" -o ConnectTimeout=10 -o BatchMode=yes "$REMOTE_USER@$REMOTE_HOST" "echo 'SSH connection successful'" 2>/dev/null; then
    echo "Error: Cannot connect to remote server. Please check:"
    echo "1. SSH key permissions (should be 600)"
    echo "2. Remote server is accessible"
    echo "3. SSH key is authorized on remote server"
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

echo "🚀 Starting sync to production..."

# Ensure remote directories exist and set initial permissions
echo "🔒 Setting initial permissions..."
ssh -i "$SSH_KEY_LOCATION" "$REMOTE_USER@$REMOTE_HOST" "sudo mkdir -p $REMOTE_PATH/$STORAGE_PATH/app/public $REMOTE_PATH/$STORAGE_PATH/framework/{cache,sessions,views} $REMOTE_PATH/$STORAGE_PATH/logs $REMOTE_PATH/database && sudo chown -R $REMOTE_USER:$REMOTE_USER $REMOTE_PATH/$STORAGE_PATH $REMOTE_PATH/database"

# Sync storage directory
echo "📁 Syncing storage files..."
rsync -av -e "ssh -i $SSH_KEY_LOCATION" \
    "$LOCAL_PATH/$STORAGE_PATH/" \
    "$REMOTE_USER@$REMOTE_HOST:$REMOTE_PATH/$STORAGE_PATH/"

# Sync database if requested
if [ "$include_db" = true ]; then
    echo "🗄️  Syncing database..."
    rsync -av -e "ssh -i $SSH_KEY_LOCATION" \
        "$LOCAL_PATH/$DB_PATH" \
        "$REMOTE_USER@$REMOTE_HOST:$REMOTE_PATH/$DB_PATH"
fi

# Set final permissions for web server
echo "🔒 Setting final permissions..."
ssh -i "$SSH_KEY_LOCATION" "$REMOTE_USER@$REMOTE_HOST" "sudo chown -R www-data:www-data $REMOTE_PATH/$STORAGE_PATH $REMOTE_PATH/database && sudo chmod -R 775 $REMOTE_PATH/$STORAGE_PATH $REMOTE_PATH/database"

echo "✅ Sync to production complete!" 