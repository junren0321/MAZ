require('dotenv').config();
const cors = require('cors');
const express = require('express');
const path = require('path');
const app = express();


// Middleware for parsing JSON and form-data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Serve static files
app.use(express.static(path.join(__dirname, '../client/public')));
app.use('/src', express.static(path.join(__dirname, '../client/src')));
app.use('/css', express.static(path.join(__dirname, '../client/css')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Import and use API routes
const apiRoutes = require('./routes/apiRoutes');
app.use('/api', apiRoutes);
<<<<<<< HEAD

module.exports = app;
=======
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
>>>>>>> e30fde2 (prototype)

module.exports = app;

