const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose'); // MongoDB

const app = express();

// Middleware (allows us to read JSON data)
app.use(cors());
app.use(express.json());

// ------------------
// CONNECT TO MONGODB 
// ------------------
// This connects to your local MongoDB. 
mongoose.connect('mongodb://127.0.0.1:27017/couple-app', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("✅ MongoDB Connected"))
.catch(err => console.log("❌ MongoDB Error:", err));


// ------
// Routes 
// ------
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