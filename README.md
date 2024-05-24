### macOS:

#### Installing Node.js:

1. Download the rebuilt version of Node.js from [Node.js official website](https://nodejs.org/en/download/prebuilt-installer/current).

2. Follow the installation instructions provided for macOS.

#### Installing MySQL:

1. Download MySQL from the [official website](https://dev.mysql.com/downloads/installer/).

2. Follow the installation instructions provided for macOS.

#### Configuring MySQL:

1. Navigate to MySQL bin directory:
   ```bash
   cd /usr/local/mysql/bin
   ```

2. Execute setup script:
   ```bash
   ./mysql -u root -p < /path/to/directory/WebApp_Project/database/setup.sql
   ```

#### Setting up Node.js dependencies:

1. Navigate to your project directory:
   ```bash
   cd /path/to/directory/WebApp_Project/server
   ```

2. Initialize npm and install required packages:
   ```bash
   npm init -y
   npm install express mysql2 multer bcryptjs jsonwebtoken dotenv
   ```

#### Running the website:

Start the server:
```bash
node server.js
```

**Remember:** Change the `DB_PASSWORD` in "/path/to/directory/WebApp_Project/server/.env" to your MySQL password.

### Windows:

#### Installing Node.js:

1. Download the rebuilt version of Node.js from [Node.js official website](https://nodejs.org/en/download/prebuilt-installer/current).

2. Follow the installation instructions provided for Windows.

#### Installing MySQL:

1. Download MySQL from the [official website](https://dev.mysql.com/downloads/installer/).

2. Follow the installation instructions provided for Windows.

#### Configuring MySQL:

1. Navigate to MySQL bin directory:
   ```bash
   cd "C:\Program Files\MySQL\MySQL Server 8.0\bin"
   ```

2. Execute setup script:
   ```bash
   mysql -u root -p < \path\to\directory\WebApp_Project\database\setup.sql
   ```

#### Setting up Node.js dependencies:

1. Navigate to your project directory:
   ```bash
   cd \your\path\to\directory\WebApp_Project\server
   ```

2. Initialize npm and install required packages:
   ```bash
   npm init -y
   npm install express mysql2 multer bcryptjs jsonwebtoken dotenv
   ```

#### Running the website:

Start the server:
```bash
node server.js
```

**Remember:** Change the `DB_PASSWORD` in "\your\path\to\directory\WebApp_Project\server\.env" to your MySQL password.
