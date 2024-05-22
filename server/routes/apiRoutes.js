const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/UserController');
const { uploadImage, getImages, upload } = require('../controllers/ImageController');
const authenticateToken = require('../util/authMiddleware');

router.post('/register', register);
router.post('/login', login);
router.post('/upload', authenticateToken, upload.single('imageFile'), uploadImage);
router.get('/images', getImages);

module.exports = router;