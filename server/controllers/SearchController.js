const db = require('../config/database');

exports.searchBooks = async (req, res) => {
    console.log('Query Parameters:', req.query);

    const { title, isbn, language, tags, authors } = req.query;

    let query = 'SELECT * FROM books WHERE';
    const conditions = [];
    const params = [];

    if (title) {
        conditions.push('name LIKE ?');
        params.push(`%${title}%`);
    }
    if (isbn) {
        conditions.push('isbn = ?');
        params.push(isbn);
    }
    if (language) {
        conditions.push('language = ?');
        params.push(language);
    }

    if (tags) {
        const tagsConditions = tags.split(',').map(tag => `tags LIKE ?`).join(' OR ');
        tags.split(',').forEach(tag => params.push(`%,${tag.trim()},%`));
        conditions.push(`(${tagsConditions})`);
    }

    if (authors) {
        const authorsConditions = authors.split(',').map(author => `authors LIKE ?`).join(' OR ');
        authors.split(',').forEach(author => params.push(`%,${author.trim()},%`));
        conditions.push(`(${authorsConditions})`);
    }

    if (conditions.length === 0) {
        return res.status(400).json({ error: 'No search parameters provided.' });
    }

    query += conditions.join(' AND ');

    try {
        const [rows] = await db.query(query, params);
        const books = rows.map(row => ({
            id: row.id,
            name: row.name,
            authors: row.authors.slice(1, -1).split(',').map(a => a.trim()),
            isbn: row.isbn,
            tags: row.tags.slice(1, -1).split(',').map(t => t.trim()),
            language: row.language,
            description: row.description,
            url: `/uploads/${row.filename}`
        }));
        res.json(books);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Database error during book search.' });
    }
};


/*
Query:
Suppose the frontend requests books with the following search parameters:
Title: "Advanced Programming"
ISBN: "123456789"
Language: "English"
Tags: "Education,Programming"
Authors: "Alice,Bob"

SELECT * FROM books
WHERE
    name LIKE '%Advanced Programming%' AND
    isbn = '123456789' AND
    language = 'English' AND
    (tags LIKE '%,Education,%' OR tags LIKE '%,Programming,%') AND
    (authors LIKE '%,Alice,%' OR authors LIKE '%,Bob,%')
*/