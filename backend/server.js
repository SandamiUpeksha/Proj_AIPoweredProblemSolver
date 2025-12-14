const express = require('express');
const cors = require('cors');

const app = express();

// Middleware (allows us to read JSON data)
app.use(cors());
app.use(express.json());

// Import routes
const resolveRoutes = require('./routes/resolveRoutes');

// Use routes
app.use('/api/resolve', resolveRoutes);

app.get('/', (req, res) => {
    res.send('Backend is running!');
});

// Start the server
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});