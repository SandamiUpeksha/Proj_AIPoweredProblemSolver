const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose'); // MongoDB

const app = express();

// Middleware (allows us to read JSON data)
app.use(cors());
app.use(express.json());

// ------------------
// CONNECT TO MONGODB ATLAS
// ------------------
mongoose.connect('mongodb+srv://pdsilva496_db_user:4jL8YCFoDnyfeFaY@couple-app.vxmmkoi.mongodb.net/couple-app?retryWrites=true&w=majority&appName=couple-app')
.then(() => console.log("✅ MongoDB Atlas Connected to 'couple-app' database"))
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


// 👇👇👇 ADD THIS DIRECT DEBUG ROUTE 👇👇👇
const ProblemLog = require('./models/ProblemLog');

app.get('/test-logs', async (req, res) => {
  try {
    console.log("⚡ DIRECT DEBUG ROUTE HIT!");
    const logs = await ProblemLog.find().sort({ createdAt: -1 }).limit(10);
    res.json(logs);
  } catch (err) {
    console.error(err);
    res.status(500).send("Database Error: " + err.message);
  }
});
// 👆👆👆 END DEBUG ROUTE 👆👆👆

// Start the server
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (reason, promise) => {
  console.error('❌ Unhandled Rejection at:', promise, 'reason:', reason);
});