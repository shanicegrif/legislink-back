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
        const user = await db.one(`SELECT * FROM users WHERE user_uid = ${id}`);
        return user;
    } catch(err) {
        console.error(err);
    }
}

//GET "/email/:email" or something...
const searchUserByEmail = async (user_email) => {
    try{
        const user = await db.one(`SELECT * FROM users WHERE user_email = '${user_email}'`);
        return user;
    } catch(err){
        console.error(err);
    }
};

//POST
const createNewUser = async (item) => {
    const { uid, user_zip } = item;

    try {
        const user = await db.one("INSERT INTO users (user_uid, user_zip) VALUES ($1, $2) RETURNING *", [uid, user_zip]);
        return user;
    } catch(err){
        console.error(err);
    }
}

//PUT "/:id"
const updateUserById = async(id, item) => {
    const { uid, user_zip } = item;
    
    try {
        const user = await db.one(`UPDATE users SET user_uid=$1, user_zip=$2 WHERE user_id = ${id} RETURNING *`,[ uid, user_zip ]);
        return user;
    } catch(err){
        console.error(err);
    }
}

//DELETE "/:id"
const deleteUserById = async(id) => {
    try {
        const user = await db.one(`DELETE FROM users WHERE user_id = ${id} RETURNING *`);
        return user;
    } catch(err){
        console.error(err);
    }
}

module.exports = {
    getAllUsers,
    getSingleUserByUID,
    searchUserByEmail,
    createNewUser,
    updateUserById,
    deleteUserById,
}