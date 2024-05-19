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
    const { filename } = req.file; // This comes from the file upload middleware (e.g., multer)
    const user_id = req.user.id; // Assuming this is extracted from JWT or session
    const { name, author, language, tags, publisher, publish_date, translated_by, page_count, isbn, remark } = req.body;

    try {
        await db.query('INSERT INTO images (filename, name, author, language, tags, publisher, publish_date, translated_by, uploaded_by, page_count, isbn, remark) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', 
            [filename, name, author, language, tags, publisher, publish_date, translated_by, user_id, page_count, isbn, remark]);
        res.status(200).json({ message: 'Image uploaded successfully.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Database error during image upload.' });
    }
};

// Fetch all images
exports.getImages = async (req, res) => {
    try {
        const [rows] = await db.query('SELECT id, filename, name, author, language, tags, publisher, publish_date, translated_by, uploaded_by, upload_date, page_count, isbn, remark FROM images');
        const images = rows.map(row => ({
            id: row.id,
            filename: row.filename,
            name: row.name,
            author: row.author,
            language: row.language,
            tags: row.tags,
            publisher: row.publisher,
            publishDate: row.publish_date,
            translatedBy: row.translated_by,
            uploadedBy: row.uploaded_by,
            uploadDate: row.upload_date,
            pageCount: row.page_count,
            isbn: row.isbn,
            remark: row.remark,
            url: `/uploads/${row.filename}`
        }));
        res.json(images);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error retrieving images from the database.' });
    }
};

module.exports.upload = upload;