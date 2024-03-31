const db = require("../db/dbConfig.js");

/*
        TODO: { email, displayName, photoURL, uid }

    CREATE TABLE users (
        user_id SERIAL PRIMARY KEY,
        user_email TEXT UNIQUE NOT NULL,
        user_display_name TEXT,
        user_photoURL TEXT,
        user_uid TEXT NOT NULL,
        user_zipcode INTEGER NOT NULL,
    );
*/

/**
 * *********************
 * TODO: put some console.log to print a message for nodemon
 * *********************
 */

//GET "/"
const getAllUsers = async () => {
    try {
        const users = await db.any("SELECT * FROM users");
        return users;
    } catch(err) {
        console.error(err);
    }
}

//GET "/:id"
const getSingleUserByUID = async (id) => {
    try{
        const user = await db.one(`SELECT * FROM users WHERE user_uid='${id}'`);
        return user;
    } catch(err) {
        console.error(err);
    }
}

//POST
const createNewUser = async (item) => {
    const { uid, street, city, state, zip } = item;

    try {
        const user = await db.one("INSERT INTO users (user_uid, user_street, user_city, user_state, user_zip) VALUES ($1, $2, $3, $4, $5) RETURNING *", [uid, street, city, state, zip]);
        return user;
    } catch(err){
        console.error(err);
    }
}

//PUT "/:id"
const updateUserById = async(id, item) => {
    const { street, city, state, zip } = item;
    console.log(item)
    
    try {
        const user = await db.one(`UPDATE users SET user_street=$1, user_city=$2, user_state=$3, user_zip=$4 WHERE user_uid='${id}' RETURNING *`,[ street, city, state, zip ]);
        return user;
    } catch(err){
        console.error(err);
    }
}

//DELETE "/:id"
const deleteUserById = async(id) => {
    try {
        const user = await db.one(`DELETE FROM users WHERE user_uid='${id}' RETURNING *`);
        return user;
    } catch(err){
        console.error(err);
    }
}

module.exports = {
    getAllUsers,
    getSingleUserByUID,
    createNewUser,
    updateUserById,
    deleteUserById,
}