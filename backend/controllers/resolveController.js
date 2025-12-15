// backend/controllers/resolveController.js
const axios = require('axios');
const ProblemLog = require('../models/ProblemLog');

const AI_SERVICE_URL = process.env.AI_SERVICE_URL || 'http://127.0.0.1:8000';

// 1. ANALYZE PROBLEM
exports.analyzeProblem = async (req, res) => {
  try {
    const { problemText } = req.body;
    console.log("📝 Received:", problemText);

    // ---------------------------------------------------------
    // STEP A: Get Answer from AI (Critical - Must Work)
    // ---------------------------------------------------------
    const aiResponse = await axios.post(`${AI_SERVICE_URL}/predict`, {
      text: problemText
    });
    const { category, suggested_solutions } = aiResponse.data;

    // ---------------------------------------------------------
    // STEP B: Save to Database (Non-Critical - Can Fail Safely)
    // ---------------------------------------------------------
    let savedLog = null;
    try {
      const newLog = new ProblemLog({
        text: problemText,
        predictedCategory: category,
        wasHelpful: null // Explicitly start as null (not voted yet)
      });
      
      savedLog = await newLog.save();
      console.log("✅ Saved to MongoDB! ID:", savedLog._id);
      
    } catch (dbError) {
      // If DB fails, we print the error but DO NOT stop the app.
      console.error("⚠️ Database Save Failed (User still gets answer):", dbError.message);
    }

    // ---------------------------------------------------------
    // STEP C: Send Response
    // ---------------------------------------------------------
    res.json({
      success: true,
      category,
      suggestions: suggested_solutions,
      logId: savedLog ? savedLog._id : null // Send ID only if save worked
    });

  } catch (error) {
    console.error("❌ Critical AI Error:", error.message);
    res.status(500).json({ msg: "AI Service is offline" });
  }
};

// 2. SUBMIT FEEDBACK
exports.submitFeedback = async (req, res) => {
  try {
    const { logId, wasHelpful } = req.body;

    // Validation: Ensure we actually have an ID
    if (!logId) {
      return res.status(400).json({ msg: "No Log ID provided" });
    }

    const updatedLog = await ProblemLog.findByIdAndUpdate(
      logId, 
      { wasHelpful: wasHelpful },
      { new: true } // Return the updated version
    );

    if (!updatedLog) {
      return res.status(404).json({ msg: "Log not found" });
    }

    console.log(`📝 Feedback for ${logId}: ${wasHelpful ? "👍" : "👎"}`);
    res.json({ success: true });

  } catch (error) {
    console.error("Feedback Error:", error.message);
    res.status(500).json({ msg: "Error saving feedback" });
  }
};

// 3. GET LOGS
exports.getLogs = async (req, res) => {
  try {
    const logs = await ProblemLog.find().sort({ createdAt: -1 }).limit(20);
    res.json(logs);
  } catch (error) {
    console.error("Get Logs Error:", error.message);
    res.status(500).json({ msg: "Server error" });
  }
};