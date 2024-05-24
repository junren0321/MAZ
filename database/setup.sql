CREATE DATABASE IF NOT EXISTS MAZ;

USE MAZ;

CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    birthdate DATE NOT NULL,
    password VARCHAR(255) NOT NULL,
    security_question VARCHAR(255) NOT NULL,
    security_answer VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS images (
    id INT AUTO_INCREMENT PRIMARY KEY,
    filename VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    author VARCHAR(255),
    language VARCHAR(50),
    tags TEXT,
    publisher VARCHAR(255),
    publish_date DATE,
    translated_by VARCHAR(255),
    uploaded_by INT,
    upload_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    page_count INT,
    isbn VARCHAR(20),
    remark TEXT,
    FOREIGN KEY (uploaded_by) REFERENCES users(id)
);
