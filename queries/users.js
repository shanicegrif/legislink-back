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
const getSingleUser = async (id) => {
    try{
        const user = await db.one(`SELECT * FROM users WHERE user_id = ${id}`);
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
    const { email, displayName, photoURL, uid } = item;

    try {
        const user = await db.one("INSERT INTO users (user_email, user_display_name, user_photoURL, user_uid) VALUES ($1, $2, $3, $4) RETURNING *", [email, displayName, photoURL, uid]);
        return user;
    } catch(err){
        console.error(err);
    }
}

//PUT "/:id"
const updateUserById = async(id, item) => {
    const { email, displayName, photoURL, uid } = item;
    
    try {
        const user = await db.one(`UPDATE users SET user_email=$1, user_display_name=$2, user_photoURL=$3 user_uid=$4 WHERE user_id = ${id} RETURNING *`,[email, displayName, photoURL, uid]);
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
    getSingleUser,
    searchUserByEmail,
    createNewUser,
    updateUserById,
    deleteUserById,
}