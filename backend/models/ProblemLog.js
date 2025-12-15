const mongoose = require('mongoose');

const ProblemLogSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true
  },
  predictedCategory: {
    type: String,
    required: true
  },
  wasHelpful: {
    type: mongoose.Schema.Types.Mixed,  // Allows null, true, or false
    default: null  // null = no feedback yet, true = 👍, false = 👎
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('ProblemLog', ProblemLogSchema);