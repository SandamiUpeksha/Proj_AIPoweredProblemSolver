require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose'); // MongoDB

const app = express();

// Middleware (allows us to read JSON data)
const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    // Allow all vercel.app domains and localhost
    if (origin.includes('.vercel.app') || origin.includes('localhost')) {
      return callback(null, true);
    }
    
    callback(new Error('Not allowed by CORS'));
  },
  optionsSuccessStatus: 200,
  credentials: true
};
app.use(cors(corsOptions));
app.use(express.json());

// ------------------
// CONNECT TO MONGODB ATLAS
// ------------------
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://pdsilva496_db_user:4jL8YCFoDnyfeFaY@couple-app.vxmmkoi.mongodb.net/couple-app?retryWrites=true&w=majority&appName=couple-app';
mongoose.connect(MONGODB_URI)
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
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (reason, promise) => {
  console.error('❌ Unhandled Rejection at:', promise, 'reason:', reason);
});