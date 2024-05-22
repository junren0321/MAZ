const db = require('../config/database');
const multer = require('multer');

// Multer setup for book upload
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'uploads'),
    filename: (req, file, cb) => cb(null, `${Date.now()}_${file.originalname}`),
});
const upload = multer({ storage });

// Book upload
exports.uploadBook = async (req, res) => {
    // Log that the upload function was called
    // console.log('Upload function called:', req.body);
    if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded.' });
    }
    const { filename } = req.file; // Comes from the file upload middleware (e.g., multer)
        
    const user_id = req.user.id; // Assuming this is extracted from JWT or session
    const { name, language, publisher, publish_date, translated_by, page_count, isbn, description } = req.body;

    // Handle authors and tags: ensure they are arrays and convert them to comma-separated strings
    let authors = req.body.authors;
    let tags = req.body.tags;

    // Check if authors and tags exist and are arrays, otherwise treat them as empty arrays
    authors = Array.isArray(authors) ? authors : [authors];
    tags = Array.isArray(tags) ? tags : [tags];
    
    const authorsStr = authors.length > 0 ? ',' + authors.join(',') + ',' : ',,';
    const tagsStr = tags.length > 0 ? ',' + tags.join(',') + ',' : ',,';

    try {
        await db.query('INSERT INTO books (filename, name, authors, language, tags, publisher, publish_date, translated_by, uploaded_by, page_count, isbn, description) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', 
            [filename, name, authorsStr, language, tagsStr, publisher, publish_date, translated_by, user_id, page_count, isbn, description]);
        res.status(200).json({ message: 'Book uploaded successfully.' });
    } catch (error) {
        console.error('Database error during book upload:', error);
        res.status(500).json({ error: 'Database error during book upload.' });
    }
};


// Fetch all books
exports.getBooks = async (req, res) => {
    try {
        const [rows] = await db.query('SELECT id, filename, name, authors, language, tags, publisher, publish_date, translated_by, uploaded_by, upload_date, page_count, isbn, description FROM books');
        const books = rows.map(row => ({
            id: row.id,
            filename: row.filename,
            name: row.name,
            authors: row.authors ? row.authors.slice(1, -1).split(',') : [],  // Remove leading and trailing commas, then split
            language: row.language,
            tags: row.tags ? row.tags.slice(1, -1).split(',') : [],  // Apply similar logic to tags
            publisher: row.publisher,
            publishDate: row.publish_date,
            translatedBy: row.translated_by,
            uploadedBy: row.uploaded_by,
            uploadDate: row.upload_date,
            pageCount: row.page_count,
            isbn: row.isbn,
            description: row.description,
            url: `/uploads/${row.filename}`
        }));
        res.json(books);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error retrieving books from the database.' });
    }
};


module.exports.upload = upload;