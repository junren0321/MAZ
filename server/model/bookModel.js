const { DataTypes } = require('sequelize');
const db = require('../config/database');

const Book = db.define('Book', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    language: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    publisher: DataTypes.STRING,
    publish_date: DataTypes.DATEONLY,
    translated_by: DataTypes.STRING,
    page_count: DataTypes.INTEGER,
    isbn: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    description: DataTypes.TEXT,
    filename: DataTypes.STRING, // Assuming you store filenames for books
});

module.exports = Book;
