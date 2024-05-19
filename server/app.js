require('dotenv').config();
const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware for parsing JSON and form-data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files
app.use(express.static(path.join(__dirname, '../client/public')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Import and use API routes
const apiRoutes = require('./routes/apiRoutes');
app.use('/api', apiRoutes);
<<<<<<< HEAD

module.exports = app;
=======
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
>>>>>>> e30fde2 (prototype)
