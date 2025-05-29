const express = require('express');
const router = express.Router();
const reportController = require('../controllers/reportController');

// Vista del reporte
router.get('/', reportController.showReport);

module.exports = router;

