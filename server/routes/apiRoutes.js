const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/UserController');
const { uploadBook, getBooks, upload } = require('../controllers/BookController');
const authenticateToken = require('../util/authMiddleware');

router.post('/register', register);
router.post('/login', login);
router.post('/upload', authenticateToken, upload.single('pdfupload'), uploadBook);
router.get('/books', getBooks);

module.exports = router;
