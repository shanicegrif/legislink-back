const db = require("../db/dbConfig.js");
const pgp = require("pg-promise")();

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
const getAllPreferences = async () => {
    try {
        const answers = await db.any("SELECT * FROM preferences");
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
const getAllPreferencesBySingleUserID = async (id) => {
    try{
        const answers = await db.any(`SELECT * FROM preferences WHERE user_uid='${id}'`);
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
 * preference_my_district BOOLEAN DEFAULT TRUE,
    preference_statement BOOLEAN DEFAULT TRUE
 * @param {object} item 
 * @returns 
 */
const createNewPreference = async (id, items) => {
    console.log(items);
    try{
        const insertion = await db.any(`INSERT INTO preferences (user_uid, preference_my_district, preference_statement, preference_today_vote) VALUES ($1, $2, $3, $4) RETURNING *`, [id, items.myDistrict, items.statement, items.todayVote]);
        console.log(insertion)
        return insertion;
    } catch(err){
        console.error(err);
    }
}

//PUT "/:id"

const updatePreferenceById = async(id, items) => {
    try {
        const updatedAnswer = await db.one(`UPDATE preferences SET (preference_my_district=$1 preference_statement=$2 preference_today_vote=$3) WHERE uid='${id}' RETURNING *`,[items.myDistrict, items.statement, items.todayVote]);
        return updatedAnswer;
    } catch(err){
        console.error(err);
    }
}

//DELETE "/:id"
/*
const deleteInterestsById = async(id, word) => {
    try {
        const deletedAnswer = await db.any(`DELETE FROM users_interests WHERE (user_uid='${id}' AND users_interests_keywords='${word}') RETURNING *`);
        return deletedAnswer;
    } catch(err){
        console.error(err);
    }
}
*/

module.exports = {
    getAllPreferences,
    getAllPreferencesBySingleUserID,
    createNewPreference,
    updatePreferenceById,
}