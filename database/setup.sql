CREATE DATABASE IF NOT EXISTS MAZ;

USE MAZ;

DROP TABLE IF EXISTS books;
DROP TABLE IF EXISTS users;

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    birthdate DATE NOT NULL,
    password VARCHAR(255) NOT NULL,
    security_question VARCHAR(255) NOT NULL,
    security_answer VARCHAR(255) NOT NULL
);

CREATE TABLE books (
    id INT AUTO_INCREMENT PRIMARY KEY,
    filename VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    authors VARCHAR(1000),
    language VARCHAR(50),
    tags VARCHAR(1000),
    publisher VARCHAR(255),
    publish_date DATE,
    translated_by VARCHAR(255),
    uploaded_by INT,
    upload_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    page_count INT,
    isbn VARCHAR(20),
    description TEXT,
    FOREIGN KEY (uploaded_by) REFERENCES users(id)
);