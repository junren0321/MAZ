// models/Review.js

const { db, sequelize } = require('../config/database');


class Review extends Model {}

Review.init(
  {
    // Model attributes
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    review: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    isbn: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
      onUpdate: DataTypes.NOW
    }
  },
  {
    // Other model options
    sequelize, // We need to pass the connection instance
    modelName: 'Review', // We need to choose the model name
    tableName: 'Reviews', // We need to specify the table name
  }
);

module.exports = Review;