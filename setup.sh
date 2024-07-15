#!/bin/bash

# Load NVM
export NVM_DIR="$([ -z "${XDG_CONFIG_HOME-}" ] && printf %s "${HOME}/.nvm" || printf %s "${XDG_CONFIG_HOME}/nvm")"
# This loads nvm
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
# This loads nvm bash_completion
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"

# Check if NVM is installed
if ! command -v nvm &> /dev/null
then
    echo "NVM is not installed. Please install NVM and try again."
    exit
fi

# Use NVM to install and use the Node.js version specified in .nvmrc
nvm install
nvm use

# Check if PostgreSQL is installed
if ! command -v psql &> /dev/null
then
    echo "PostgreSQL is not installed. Please install PostgreSQL and try again."
    exit
fi

# Set default values for database and user
DB_NAME="shopping_list"
DB_USER="admin"
DB_PASSWORD="password"

# Create PostgreSQL user and database
echo "Creating PostgreSQL user and database..."

psql -U postgres -d postgres <<EOF
DO \$\$
BEGIN
   IF NOT EXISTS (
      SELECT
      FROM   pg_catalog.pg_roles
      WHERE  rolname = '${DB_USER}') THEN

      CREATE ROLE ${DB_USER} WITH LOGIN PASSWORD '${DB_PASSWORD}';
   END IF;
END
\$\$;

DO \$\$
BEGIN
   IF NOT EXISTS (
      SELECT
      FROM   pg_database
      WHERE  datname = '${DB_NAME}') THEN

      CREATE DATABASE ${DB_NAME} OWNER ${DB_USER};
   END IF;
END
\$\$;

GRANT ALL PRIVILEGES ON DATABASE ${DB_NAME} TO ${DB_USER};
EOF

echo "PostgreSQL user and database created."

# Install dependencies with --legacy-peer-deps flag
echo "Installing dependencies..."
npm install --legacy-peer-deps
npm --prefix server install --legacy-peer-deps
npm --prefix client install --legacy-peer-deps

echo "Dependencies installed."

# Build the server TypeScript files
echo "Building server..."
npm --prefix server run build

# Start the server and client in separate terminal sessions
echo "Starting the server..."
osascript -e 'tell application "Terminal" to do script "cd $(pwd)/server && npm run dev"'

echo "Starting the client..."
osascript -e 'tell application "Terminal" to do script "cd $(pwd)/client && npm start"'
