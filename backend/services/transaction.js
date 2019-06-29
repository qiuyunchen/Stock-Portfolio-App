const db = require('./dbConnect');
const TransactionService = {};
module.exports = TransactionService;

TransactionService.createTransaction = ({user_id, ticker, price, shares}) =>{
    const sql = `
        INSERT INTO transactions 
        (user_id, ticker, price, shares) 
        VALUES
        ($[user_id], $[ticker], $[price], $[shares])
        RETURNING *;
    `;
    return db.one(sql, {user_id, ticker, price, shares});
}

TransactionService.getTransactionsByUserID = (id) =>{
    const sql =`
        SELECT *
        FROM transactions
        WHERE user_id = $[id]
        ORDER BY 
            transact_date DESC;
    `;
    return db.any(sql, {id});
}

TransactionService.getTransactionByID = (id) =>{
    const sql =`
        SELECT *
        FROM Transactions
        WHERE id = $[id];
    `;
    return db.one(sql, {id});
}