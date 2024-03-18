const db = require("../db/dbConfig.js");

/**********************************************************
 * 
 * ToDo: need more queries to control the answers table.
 * TODO: put some console.log to print a message for nodemon
 * 
 * 
 **********************************************************/

/*
CREATE TABLE interest_keywords (
    keywords_id SERIAL PRIMARY KEY,
    keywords_text TEXT NOT NULL
);

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
const getAllInterestKeywords = async () => {
    try {
        const keywords = await db.any("SELECT * FROM interest_keywords");
        return keywords;
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
const getSingleInterestKeywordBySingleUserID = async (id) => {
    try{
        const keywords = await db.any(`SELECT * FROM interest_keywords WHERE keywords_id = ${id}`);
        return keywords;
    } catch(err) {
        console.error(err);
    }
}

module.exports = {
    getAllInterestKeywords,
    getSingleInterestKeywordBySingleUserID,
}
