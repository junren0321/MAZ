// controllers/reviewController.js

const db = require('../config/database');

const submitReview = async (req, res) => {
    const { username, bookId, review } = req.body;
    try {
        const [result] = await db.query(
            'INSERT INTO Reviews (username, bookId, review) VALUES (?, ?, ?)',
            [username, bookId, review]
        );
        res.status(201).json({ message: 'Review submitted successfully', reviewId: result.insertId });
    } catch (error) {
        console.error('Error submitting review:', error);
        res.status(500).json({ error: 'Error submitting review', details: error.message });
    }
};

const fetchReviews = async (req, res) => {
    const bookId = req.params.bookId;
    const query = `
        SELECT * 
        FROM Reviews 
        WHERE bookId = ?;
    `;
    try {
                const results = await db.query(query, [bookId]);
                // console.log(results, bookId);
                res.status(200).json(results);
            } catch (error) {
                console.error('Error fetching reviews:', error);
                res.status(500).json({ error: 'Error fetching reviews' });
            }
    // db.query(query, [bookId], (err, results) => {
    //     if (err) {
    //         res.status(500).send(err);
    //     } else {
    //         res.json(results);
    //     }
    // });
    // try {
    //     const [reviews] = await db.query('SELECT * FROM Reviews');
    //     res.status(200).json(reviews);
    // } catch (error) {
    //     console.error('Error fetching reviews:', error);
    //     res.status(500).json({ error: 'Error fetching reviews' });
    // }
};

const deleteReview = async (req, res) =>{
    const review = req.params.review;
    const query = `
        DELETE FROM Reviews 
        WHERE review = ?;
    `;
    try {
        await db.query(query, [review]);
        res.sendStatus(204); // No content response for successful deletion
    } catch (error) {
        console.error('Error deleting review:', error);
        res.status(500).json({ error: 'Error deleting review' });
    }
};

const editReview = async (req, res) => {
    const reviewId = req.params.reviewId;
    const { review } = req.body;
    const query = `
        UPDATE Reviews 
        SET review = ? 
        WHERE id = ?;
    `;
    try {
        await db.query(query, [review, reviewId]);
        res.sendStatus(204); // No content response for successful update
    } catch (error) {
        console.error('Error editing review:', error);
        res.status(500).json({ error: 'Error editing review' });
    }
};

module.exports = { submitReview, fetchReviews, deleteReview, editReview };