# Personal Portfolio v3

My personal portfolio website showcasing my projects, skills, and experience. Built with modern technologies and a focus on performance and user experience.

## Tech Stack

### Frontend
- Next.js 13 (App Router)
- TypeScript
- Tailwind CSS
- Framer Motion
- Three.js

### Backend
- Laravel
- SQLite
- PHP 8.3
- React
- TypeScript

## Deployment
The application is deployed on: AWS EC2 instance

## File Synchronization

The project includes two sync scripts to manage file synchronization between local and production environments. These scripts are located in the `scripts` directory.

### Configuration

1. Create a `.env` file in the `scripts` directory:
```bash
cd scripts
cp .env.example .env
```

2. Update the `.env` file with your configuration:
```env
# Remote server configuration
REMOTE_USER=EC2_USER
REMOTE_HOST=EC2_HOST
SSH_KEY=/path/to/your/ssh/key.pem

# Path configuration
REMOTE_PATH=
LOCAL_PATH=../backend
STORAGE_PATH=storage
DB_PATH=database/database.sqlite
```

### Sync Commands

#### Sync from Local to Production
```bash
cd scripts
./sync-to-prod.sh [-d]
```
- Use `-d` flag to include database sync

This will sync:
- Storage files (uploads, cache, etc.)
- Database (optional)
- Sets proper permissions on the server

#### Sync from Production to Local
```bash
cd scripts
./sync-to-local.sh [-d]
```
- Use `-d` flag to include database sync

This will:
- Sync storage files from production
- Create a backup of your local database (if exists)
- Sync the production database (optional)
- Set appropriate local permissions