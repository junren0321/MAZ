const db = require('../config/database');
const { User } = require('../model/userModel'); // Assuming you have User and Book models defined
const { Book } = require('../model/bookModel');
// Define Review Model
const Review = db.define('Review', {
  review: {
    type: db.Sequelize.TEXT,
    allowNull: false,
  },
});

// Define associations
Review.belongsTo(User, { foreignKey: 'user_id' });
Review.belongsTo(Book, { foreignKey: 'book_id' });

// Submit a review
const submitReview = async (req, res) => {
  try {
    const { user_id, book_id, review } = req.body;

    // Validate request body
    if (!user_id || !book_id || !review) {
      return res.status(400).send('user_id, book_id, and review are required.');
    }

    const newReview = await Review.create({ user_id, book_id, review });
    res.status(201).send('Review submitted successfully');
  } catch (error) {
    console.error('Error submitting review:', error);
    res.status(500).send('Error submitting review');
  }
};

// Fetch all reviews
const fetchReviews = async (req, res) => {
  try {
    const reviews = await Review.findAll({ include: [User, Book] });
    res.status(200).json(reviews);
  } catch (error) {
    console.error('Error fetching reviews:', error);
    res.status(500).send('Error fetching reviews');
  }
};

module.exports = { submitReview, fetchReviews, Review};
