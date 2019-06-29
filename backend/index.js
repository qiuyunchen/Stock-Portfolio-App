// NPM MODULES
const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');

// ROUTERS
const stockRouter = require('./routes/stock');
const transactionRouter = require('./routes/transaction');
const userRouter = require('./routes/user');

// APP & PORT
const app = express();
const port = 5555;

// GLOBAL MIDDLEWARE & ROUTERS
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/stock', stockRouter);
app.use('/transaction', transactionRouter);
app.use('/user', userRouter);

// TEST ROUTE
app.get('/', (req, res) =>{
    res.json({
        test: 'connected',
        local_url: `http://localhost:${port}/`,
    })
})

app.listen(port, ()=>{
    console.log(`Server listening on port ${port}.`);
})