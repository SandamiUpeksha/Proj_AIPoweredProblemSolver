// backend/routes/resolveRoutes.js
console.log("--------------- ROUTES FILE LOADED ---------------");
const express = require('express');
const router = express.Router();
const resolveController = require('../controllers/resolveController');

// Route 1: Analyze (POST)
router.post('/analyze', resolveController.analyzeProblem);

// Route 2: Feedback (POST)
router.post('/feedback', resolveController.submitFeedback);

// Route 3: Get Logs (GET) <--- THIS IS THE MISSING PART!
router.get('/logs', resolveController.getLogs);

module.exports = router;