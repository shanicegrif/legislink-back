const db = require("../db/dbConfig.js");

/**********************************************************
 * 
 * ToDo: need more queries to control the answers table.
 * TODO: put some console.log to print a message for nodemon
 * 
 * 
 **********************************************************/

/*
CREATE TABLE users_interests (
    users_interests_id SERIAL PRIMARY KEY,
    user_uid INTEGER REFERENCES users(user_uid) ON DELETE CASCADE,
    users_interests_keywords TEXT
);
*/

//GET "/"
/**
 * getAllAnswers()
 * ===========================
 * get all rows from the "answers".
 * 
 * @returns {Object}
 */
const getAllInterests = async () => {
    try {
        const answers = await db.any("SELECT * FROM users_interests");
        return answers;
    } catch(err) {
        console.error(err);
    }
}

//GET 
/**
 * getAllAnswersBySingleUserID()
 * ==============================
 * get all rows that belong to specific user.
 * 
 * @param {string} id - user_id
 * @returns {object}
 */
const getAllInterestsBySingleUserID = async (id) => {
    try{
        const answers = await db.any(`SELECT * FROM users_interests WHERE user_uid = ${id}`);
        return answers;
    } catch(err) {
        console.error(err);
    }
}

//POST
/**
 * createNewAnswer()
 * ============================
 * create a new row for the "answers"
 * 
 * @param {object} item 
 * @returns 
 */
const createNewInterests = async (item) => {
    const { uid, users_interests_keywords } = item;

    try {
        const newAnswer = await db.one("INSERT INTO users_interests (user_uid, users_interests_keywords) VALUES ($1, $2) RETURNING *", [ uid, users_interests_keywords ]);
        return newAnswer;
    } catch(err){
        console.error(err);
    }
}

//PUT "/:id"

const updateInterestsById = async(id, item) => {
    const { users_interests_keywords } = item

    try {
        const updatedAnswer = await db.one(`UPDATE users_interests SET users_interests_keywords=$1 WHERE uid = ${id} RETURNING *`,[users_interests_keywords]);
        return updatedAnswer;
    } catch(err){
        console.error(err);
    }
}

//DELETE "/:id"
const deleteInterestsById = async(id) => {
    try {
        const deletedAnswer = await db.one(`DELETE FROM users_interests WHERE uid = ${id} RETURNING *`);
        return deletedAnswer;
    } catch(err){
        console.error(err);
    }
}

module.exports = {
    getAllInterests,
    deleteInterestsById,
    updateInterestsById,
    createNewInterests,
    getAllInterestsBySingleUserID,
}