const express = require('express');
const TransactionService = require('../services/transaction');
const transactionRouter = express.Router();
module.exports = transactionRouter;

// Create transaction
transactionRouter.post('/', (req, res) => {
    const { user_id, ticker, price, shares } = req.body;
  
    TransactionService.createTransaction({ user_id, ticker, price, shares })
        .then(transaction => {
            res.json({ created: transaction });
        })
        .catch(err => {
            res.status(404).json({ Error: err.toString() });
        });
})

// Get transaction by id
transactionRouter.get('/id/:id', (req, res) => {
    const { id } = req.params;

    TransactionService.getTransactionByID(id)
        .then(transaction => {
            res.json(transaction);
        })
        .catch(err => {
            res.status(404).json({ Error: err.toString() });
        });
});

// Get transactions by user id
transactionRouter.get('/user/:id', (req, res) => {
    const { id } = req.params;

    TransactionService.getTransactionsByUserID(id)
        .then(transactions => {
            res.json(transactions);
        })
        .catch(err => {
            res.status(404).json({ Error: err.toString() });
        });
});