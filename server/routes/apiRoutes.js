const express = require('express');
const router = express.Router();
const { register, login, forgot, changepass } = require('../controllers/UserController');
const { uploadBook, getBooks, upload, getUserBooks, searchBooks} = require('../controllers/BookController');
const authenticateToken = require('../util/authMiddleware');
const { changemail, changepassword, changeusername, deleteuser, deletebook } = require('../controllers/ProfileController');

router.post('/register', register);
router.post('/login', login);
router.post('/upload', authenticateToken, upload.single('pdfupload'), uploadBook);
router.get('/books', getBooks);
router.post('/forgot', forgot);
router.put('/changepass', changepass);
router.get('/userBooks', authenticateToken, getUserBooks);
router.get('/searchBooks', searchBooks);
router.put('/changemail', changemail);
router.put('/changepassword', changepassword);
router.put('/changeusername', changeusername);
router.delete('/deleteuser', deleteuser);
router.delete('/deletebook', deletebook);

const { submitReview, fetchReviews, deleteReview, editReview } = require('../controllers/ReviewController');
router.post('/reviews', submitReview);
router.get('/reviews/:bookId', fetchReviews);
router.delete('/reviews/:reviewId', deleteReview);
router.put('/reviews/:reviewId', editReview);
// authenticateToken
module.exports = router;
