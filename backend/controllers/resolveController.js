const axios = require('axios');

exports.analyzeProblem = async (requestAnimationFrame, res) => {
    try {
        const { problemText } = requestAnimationFrame.body;
        console.log("Received problem:", problemText);

        // 1. Call Python Serice (Port 8000)
        const aiResponse = await axios.post('http://127.0.0.1:8000/predict', {
            text: problemText
        });

        // 2. Return data to user
        const { category, suggested_solutions } = aiResponse.data;
        res.json({
            success: true,
            category,
            suggestions: suggested_solutions
        });
        
    } catch (error) {
        console.error("❌ Error:", error.message);
        res.status(500).json({ msg: "AI Service is offline" });
    }
};