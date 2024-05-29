const { DataTypes } = require('sequelize');
const db = require('../config/database');

const User = db.define('User', {
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true,
        },
    },
    birthdate: {
        type: DataTypes.DATEONLY,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    security_question: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    security_answer: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});

module.exports = User;
