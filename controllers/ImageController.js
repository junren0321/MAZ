const db = require('../config/database');
const multer = require('multer');

// Multer setup for image upload
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'uploads/'),
    filename: (req, file, cb) => cb(null, `${Date.now()}_${file.originalname}`),
});
const upload = multer({ storage });

// Image upload
exports.uploadImage = async (req, res) => {
    const { filename } = req.file;
    const user_id = req.user.id;

    try {
        await db.query('INSERT INTO images (filename, user_id) VALUES (?, ?)', [filename, user_id]);
        res.status(200).json({ message: 'Image uploaded successfully.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Database error during image upload.' });
    }
};

// Fetch all images
exports.getImages = async (req, res) => {
    try {
        const [rows] = await db.query('SELECT filename, user_id FROM images');
        const images = rows.map((row) => ({
            url: `/uploads/${row.filename}`,
            altText: row.filename,
            user_id: row.user_id
        }));
        res.json(images);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error retrieving images from the database.' });
    }
};

module.exports.upload = upload;