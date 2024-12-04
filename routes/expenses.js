const express = require('express');
const { addExpense, getExpenses, analyzeExpenses } = require('../controllers/expensesController'); 

const router = express.Router();

// Define routes
router.post('/', addExpense);             
router.get('/', getExpenses);             
router.get('/analysis', analyzeExpenses); 

module.exports = router;
