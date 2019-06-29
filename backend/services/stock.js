const db = require('./dbConnect');
const StockService = {};
module.exports = StockService;

StockService.addStock = ({user_id, ticker, shares}) =>{
    const sql = `
        INSERT INTO stocks 
        (user_id, ticker, shares) 
        VALUES
        ($[user_id], $[ticker], $[shares])
        RETURNING *;
    `;
    return db.one(sql, {user_id, ticker, shares});
}

StockService.getStocksByUserID = (id) =>{
    const sql =`
        SELECT *
        FROM stocks
        WHERE user_id = $[id];
    `;
    return db.any(sql, {id});
}

StockService.updateStockByStockID = (id, {user_id, ticker, shares}) =>{
    const sql = `
        UPDATE stocks
        SET
            user_id = $[user_id],
            ticker = $[ticker],
            shares = $[shares]
        WHERE
            id = $[id]
        RETURNING *;
    `;
    return db.one(sql, {id, user_id, ticker, shares});
}

StockService.deleteStockByStockID = (id) =>{
    const sql = `
        DELETE FROM stocks 
        WHERE id = $[id]
        RETURNING *;
    `;
    return db.one(sql, {id});
}