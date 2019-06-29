const db = require('./dbConnect');
const UserService = {};
module.exports = UserService;

UserService.createUser = ({name, email, cash}) =>{
    const sql = `
        INSERT INTO users 
        (name, email, cash) 
        VALUES
        ($[name], $[email], $[cash])
        RETURNING *;
    `;
    return db.one(sql, {name, email, cash});
}

UserService.getUserByID = (id) =>{
    const sql =`
        SELECT *
        FROM users
        WHERE id = $[id];
    `;
    return db.one(sql, {id});
}

UserService.getUserByEmail = (email) =>{
    const sql =`
        SELECT *
        FROM users
        WHERE email = $[email];
    `;
    return db.one(sql, {email});
}

UserService.updateUserByID = (id, {name, email, cash}) =>{
    const sql = `
        UPDATE users
        SET
            name = $[name],
            email = $[email],
            cash = $[cash]
        WHERE
            id = $[id]
        RETURNING *;
    `;
    return db.one(sql, {id, name, email, cash});
}

UserService.deleteUserByID = (id) =>{
    const sql = `
        DELETE FROM users 
        WHERE id = $[id]
        RETURNING *;
    `;
    return db.one(sql, {id});
}