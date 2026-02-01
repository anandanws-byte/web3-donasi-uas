const express = require('express');
const router = express.Router();

// Mock data for transactions
let transactions = [
    { id: 1, donor: '0x123...', amount: '0.5 ETH', date: '2026-01-30' },
    { id: 2, donor: '0x456...', amount: '1.2 ETH', date: '2026-01-29' }
];

// Get all transactions
router.get('/', (req, res) => {
    res.json(transactions);
});

// Add a transaction
router.post('/', (req, res) => {
    const { donor, amount } = req.body;
    const newTransaction = {
        id: transactions.length + 1,
        donor,
        amount,
        date: new Date().toISOString().split('T')[0]
    };
    transactions.push(newTransaction);
    res.status(201).json(newTransaction);
});

module.exports = router;
