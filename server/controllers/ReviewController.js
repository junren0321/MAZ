const db = require('../config/database');

// Create a new review
exports.createReview = async (req, res) => {
    const { bookId, userId, rating, comment } = req.body;
    
    try {
        const [result] = await db.query('INSERT INTO reviews (book_id, user_id, rating, comment) VALUES (?, ?, ?, ?)', [bookId, userId, rating, comment]);
        const newReviewId = result.insertId;
        const newReview = { id: newReviewId, book_id: bookId, user_id: userId, rating: rating, comment: comment };
        res.status(201).json({ message: 'Review created successfully', review: newReview });
    } catch (error) {
        console.error('Error creating review:', error);
        res.status(500).json({ error: 'Failed to create review' });
    }
};

// Update an existing review
exports.updateReview = async (req, res) => {
    const { reviewId } = req.params;
    const { rating, comment } = req.body;
    
    try {
        const [result] = await db.query('UPDATE reviews SET rating = ?, comment = ? WHERE id = ?', [rating, comment, reviewId]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Review not found' });
        }
        const updatedReview = { id: reviewId, rating: rating, comment: comment };
        res.json({ message: 'Review updated successfully', review: updatedReview });
    } catch (error) {
        console.error('Error updating review:', error);
        res.status(500).json({ error: 'Failed to update review' });
    }
};

// Get reviews for a specific book
exports.getReviewsForBook = async (req, res) => {
    const { bookId } = req.params;
    
    try {
        const [rows] = await db.query('SELECT * FROM reviews WHERE book_id = ?', [bookId]);
        res.json(rows);
    } catch (error) {
        console.error('Error getting reviews for book:', error);
        res.status(500).json({ error: 'Failed to get reviews for book' });
    }
};
