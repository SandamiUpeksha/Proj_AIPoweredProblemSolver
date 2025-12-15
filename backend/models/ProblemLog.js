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
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('ProblemLog', ProblemLogSchema);