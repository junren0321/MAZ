const { Sequelize, DataTypes } = require('sequelize');
const { File } = require('./FileController');

// Connect to MySQL
const sequelize = new Sequelize('pdf_review_db', 'root', 'aries20020321', {
  host: 'localhost',
  dialect: 'mysql',
});

// Define Review Model
const Review = sequelize.define('Review', {
  review: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
});

File.hasMany(Review, { as: 'reviews' });
Review.belongsTo(File, { foreignKey: 'fileId', as: 'file' });

const submitReview = async (req, res) => {
  try {
    const review = await Review.create(req.body);
    res.status(201).send('Review submitted successfully');
  } catch (error) {
    res.status(500).send('Error submitting review');
  }
};

const fetchReviews = async (req, res) => {
  try {
    const reviews = await Review.findAll({ include: 'file' });
    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).send('Error fetching reviews');
  }
};

module.exports = { submitReview, fetchReviews, Review, sequelize };
