const db = require('./dbConnect');
const UserService = {};
module.exports = UserService;

UserService.create = ({name, email, cash, uid}) =>{
    const sql = `
        INSERT INTO users 
        (name, email, cash, uid) 
        VALUES
        ($[name], $[email], $[cash], $[uid])
        RETURNING *;
    `;
    return db.one(sql, {name, email, cash, uid});
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

UserService.updateUserByID = (id, {name, email, cash, uid}) =>{
    const sql = `
        UPDATE users
        SET
            name = $[name],
            email = $[email],
            cash = $[cash],
            uid = $[uid]
        WHERE
            id = $[id]
        RETURNING *;
    `;
    return db.one(sql, {id, name, email, cash, uid});
}

UserService.deleteUserByID = (id) =>{
    const sql = `
        DELETE FROM users 
        WHERE id = $[id]
        RETURNING *;
    `;
    return db.one(sql, {id});
}