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

2. Start the MySQL server:

    ```bash
    sudo /usr/local/mysql/support-files/mysql.server start
    ```

3. Execute setup script:
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
<<<<<<< HEAD
<<<<<<< HEAD
   cd "C:\Program Files\MySQL\MySQL Server X.X\bin"
=======
   cd "C:\Program Files\MySQL\MySQL Server 8.0\bin"
>>>>>>> 02c8720fd461856b2d6087b0a731171557830189
=======
   cd "C:\Program Files\MySQL\MySQL Server X.X\bin"
>>>>>>> 1919a9d82d3d40ca62b4d85c9cd705b02e0b88f4
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

<<<<<<< HEAD
**Remember:** Change the `DB_PASSWORD` in "\your\path\to\directory\WebApp_Project\server\.env" to your MySQL password.
=======
**Remember:** Change the `DB_PASSWORD` in "\your\path\to\directory\WebApp_Project\server\.env" to your MySQL password.
>>>>>>> 1919a9d82d3d40ca62b4d85c9cd705b02e0b88f4
