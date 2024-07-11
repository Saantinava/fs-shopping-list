#!/bin/bash

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

psql -U postgres <<EOF
CREATE ROLE $DB_USER WITH LOGIN PASSWORD '$DB_PASSWORD';
CREATE DATABASE $DB_NAME OWNER $DB_USER;
GRANT ALL PRIVILEGES ON DATABASE $DB_NAME TO $DB_USER;
EOF

echo "PostgreSQL user and database created."

# Install dependencies
echo "Installing dependencies..."
npm install

echo "Dependencies installed."

# Start the application
echo "Starting the application..."
npm start
