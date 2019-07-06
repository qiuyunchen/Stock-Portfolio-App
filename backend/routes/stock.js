const express = require('express');
const StockService = require('../services/stock');
const stockRouter = express.Router();
module.exports = stockRouter;

// Add owned stock
stockRouter.post('/', (req, res) => {
    const { user_id, ticker, shares } = req.body;
  
    StockService.addStock({ user_id, ticker, shares })
        .then(stock => {
            res.json({ created: stock });
        })
        .catch(err => {
            res.status(404).json({ Error: err.toString() });
        });
})

// Get stocks by user id
stockRouter.get('/user/:id', (req, res) => {
    const { id } = req.params;

    StockService.getStocksByUserID(id)
        .then(stocks => {
            res.json(stocks);
        })
        .catch(err => {
            res.status(404).json({ Error: err.toString() });
        });
});

// Update stock by id
stockRouter.put('/:id', (req, res) => {
    const { id } = req.params;
    const {user_id, ticker, shares} = req.body;

    StockService.updateStockByStockID(id, {user_id, ticker, shares})
      .then(stock => {
          res.json({ updated: stock });
      })
      .catch(err => {
          res.status(404).json({ Error: err.toString() });
      });
  });
  
  // Delete stock by id
  stockRouter.delete('/:id', (req, res) => {
    const { id } = req.params;

    StockService.deleteStockByStockID(id)
      .then(stock => {
          res.json({ deleted: stock });
      })
      .catch(err => {
          res.status(404).json({ Error: err.toString() });
      });
  });