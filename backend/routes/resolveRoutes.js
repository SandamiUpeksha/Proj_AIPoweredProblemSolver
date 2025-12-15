const express = require('express');
const router = express.Router();
const resolveController = require('../controllers/resolveController');

router.post('/analyze', resolveController.analyzeProblem);

module.exports = router;