// backend/server.js

const app = require('./app');
const PORT = process.env.PORT || 3000;

// Start the server

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

/* 
version that everyone can access :)
running on your IPV4 address
*/
// app.listen(PORT, '0.0.0.0', () => {
//     console.log(`Server is running on http://0.0.0.0:${PORT}`);
// });
