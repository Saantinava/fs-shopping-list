# Shopping List App

## Prerequisites

- Node.js v18 or later
- PostgreSQL

## Setup

### 1. Clone the Repository

```bash
git clone https://github.com/Saantinava/fs-shopping-list
cd fs-shopping-list
```

### 2. Run the Setup Script

To simplify the setup process, you can run the provided `setup.sh` script. This script will:

- Create a PostgreSQL user and database
- Install all dependencies
- Start the server and client apps

#### macOS and Linux

Make sure the script has execute permissions and then run it:

```bash
chmod +x setup.sh
./setup.sh
```

#### Windows

For Windows users, you might need to run the commands manually as the script is designed for Unix-based systems.

### Manual Setup (if not using the script)

#### 1. Install Dependencies

```bash
npm install
```

#### 2. Set Up PostgreSQL

##### macOS

1. **Install PostgreSQL using Homebrew:**

   ```bash
   brew install postgresql@14
   ```

2. **Start PostgreSQL service:**

   ```bash
   brew services start postgresql@14
   ```

3. **Create a PostgreSQL user and database:**

   ```bash
   psql -U postgres
   ```

   In the PostgreSQL CLI, run:

   ```sql
   CREATE ROLE admin WITH LOGIN PASSWORD 'password';
   CREATE DATABASE shopping_list OWNER admin;
   GRANT ALL PRIVILEGES ON DATABASE shopping_list TO admin;
   \q
   ```

##### Other Operating Systems

1. **Install PostgreSQL** from the [official PostgreSQL website](https://www.postgresql.org/download/).

2. **Start the PostgreSQL service**. The command to start the service depends on your operating system:

   - **Windows:**
     - Use the PostgreSQL app or start the service from the Services application.

   - **macOS:**
     - If installed via Homebrew: `brew services start postgresql`

   - **Linux:**
     - Systemd: `sudo systemctl start postgresql`
     - SysVinit: `sudo service postgresql start`

3. **Create a PostgreSQL user and database:**

   ```bash
   psql -U postgres
   ```

   In the PostgreSQL CLI, run:

   ```sql
   CREATE ROLE admin WITH LOGIN PASSWORD 'password';
   CREATE DATABASE shopping_list OWNER admin;
   GRANT ALL PRIVILEGES ON DATABASE shopping_list TO admin;
   \q
   ```

#### 3. Update the Server Configuration

Update the PostgreSQL connection configuration in `packages/server/src/index.ts`:

```typescript
const pool = new Pool({
  user: 'admin', // your database user
  host: 'localhost',
  database: 'shopping_list',
  password: 'password', // your database password
  port: 5432,
});
```

#### 4. Start the Application

To start both server and client apps, run:

```bash
npm start
```

This command will start the server and client applications concurrently.

## Project Structure

- **Client (Frontend):** `packages/client`
- **Server (Backend):** `packages/server`

## Development

- **Client Development:**

  Navigate to the client directory and start the client app:

  ```bash
  cd packages/client
  npm start
  ```

- **Server Development:**

  Navigate to the server directory and start the server app:

  ```bash
  cd packages/server
  npm run dev
  ```

## Scripts

- **Start both server and client:**

  ```bash
  npm start
  ```

- **Start client only:**

  ```bash
  npm --prefix packages/client start
  ```

- **Start server only:**

  ```bash
  npm --prefix packages/server run dev
  ```

## Troubleshooting

- Ensure PostgreSQL service is running.
- Verify the database user and password are correct.
- Check if the correct Node.js version is installed (`v18` or later).

By following these steps, you should have your Shopping List App up and running at localhost:3000
```