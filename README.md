# WebApp_Project Setup

Before starting, ensure you have MySQL and Node.js installed.

## Configuring MySQL:

1.Navigate to MySQL bin directory:
```bash
cd "C:\Program Files\MySQL\MySQL Server 8.0\bin"
```

2.Execute setup script:
```bash
mysql -u root -p < you\path\to\directory\WebApp_Project\database\setup.sql
```

## Setting up Node.js dependencies:

1.Navigate to your project directory:
```bash
cd your\path\to\directory\WebApp_Project\server
```

2.Initialize npm and install required packages:
```bash
npm init -y
npm install express mysql2 multer bcryptjs jsonwebtoken dotenv
```

## Running the website:

Start the server:
```bash
node server.js
```
This sequence ensures that you first set up the Node.js dependencies, then configure MySQL, and finally run the website.
