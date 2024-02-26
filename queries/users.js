const db = require("../db/dbConfig.js");

/*
    CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    user_email VARCHAR(255) UNIQUE NOT NULL,
    user_password VARCHAR(40) NOT NULL,
    user_zipcode INTEGER NOT NULL,
    manager BOOLEAN
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
}

//POST
const createNewUser = async (item) => {
    const { user_email, user_password, user_zipcode } = item;

    try {
        const message = await db.one("INSERT INTO users (user_email, user_password, user_zipcode) VALUES ($1, $2, $3) RETURNING *", [user_email, user_password, user_zipcode]);
        return message;
    } catch(err){
        console.error(err);
    }
}

//PUT "/:id"
const updateUserById = async(id, item) => {
    const { user_email, user_password, user_zipcode } = item;
    
    try {
        const message = await db.one(`UPDATE users SET user_email=$1, user_password=$2, user_zipcode=$3 WHERE user_id = ${id} RETURNING *`,[user_email, user_password, user_zipcode]);
        return message;
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