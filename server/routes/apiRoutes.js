const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/UserController');
const { uploadBook, getBooks, upload, getUserBooks, searchBooks } = require('../controllers/BookController');
const authenticateToken = require('../util/authMiddleware');

router.post('/register', register);
router.post('/login', login);
router.post('/upload', authenticateToken, upload.single('pdfupload'), uploadBook);
router.get('/books', getBooks);
router.get('/userBooks', authenticateToken, getUserBooks);
router.get('/searchBooks', searchBooks);

module.exports = router;
