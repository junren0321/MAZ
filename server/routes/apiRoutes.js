const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/UserController');
const { uploadBook, getBooks, upload, getUserBooks, searchBooks} = require('../controllers/BookController');
// const searchBooks = require('../controllers/SearchController');
const authenticateToken = require('../util/authMiddleware');

router.post('/register', register);
router.post('/login', login);
router.post('/upload', authenticateToken, upload.single('pdfupload'), uploadBook);
router.get('/books', getBooks);
router.get('/userBooks', authenticateToken, getUserBooks);
router.get('/searchBooks', searchBooks);

const { submitReview, fetchReviews, deleteReview, editReview } = require('../controllers/ReviewController');
router.post('/reviews', submitReview);
router.get('/reviews/:bookId', fetchReviews);
router.delete('/reviews/:reviewId', deleteReview);
router.put('/reviews/:reviewId', editReview);
// authenticateToken
module.exports = router;