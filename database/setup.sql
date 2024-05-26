CREATE DATABASE pdf_review_db;

USE pdf_review_db;

<<<<<<< HEAD
<<<<<<< HEAD
DROP TABLE IF EXISTS books;
DROP TABLE IF EXISTS users;

CREATE TABLE users (
=======
CREATE TABLE IF NOT EXISTS users (
>>>>>>> 22dcb29 (database update)
=======
CREATE TABLE IF NOT EXISTS users (
>>>>>>> 22dcb29 (database update)
    id INT AUTO_INCREMENT PRIMARY KEY,
    filename VARCHAR(255) NOT NULL,
    path VARCHAR(255) NOT NULL,
    originalname VARCHAR(255) NOT NULL,
    createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

<<<<<<< HEAD
CREATE TABLE books (
    id INT AUTO_INCREMENT PRIMARY KEY,
    filename VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    authors VARCHAR(1000),
    language VARCHAR(50),
    tags VARCHAR(1000),
=======
CREATE TABLE IF NOT EXISTS images (
    id INT AUTO_INCREMENT PRIMARY KEY,
    filename VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    author VARCHAR(255),
    language VARCHAR(50),
    tags TEXT,
>>>>>>> 22dcb29 (database update)
    publisher VARCHAR(255),
    publish_date DATE,
    translated_by VARCHAR(255),
    uploaded_by INT,
    upload_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    page_count INT,
    isbn VARCHAR(20),
<<<<<<< HEAD
    description TEXT,
=======
    remark TEXT,
>>>>>>> 22dcb29 (database update)
    FOREIGN KEY (uploaded_by) REFERENCES users(id)
);
