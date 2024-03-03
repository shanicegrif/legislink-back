const db = require("../db/dbConfig.js");

/**********************************************************
 * 
 * ToDo: need more queries to control the answers table.
 * TODO: put some console.log to print a message for nodemon
 * 
 * 
 **********************************************************/

/*
CREATE TABLE questionnaires (
    questionnaire_id SERIAL PRIMARY KEY,
    questionnaire_topic TEXT
);

CREATE TABLE answers (
    answer_id SERIAL PRIMARY KEY,
    questionnaire_id INTEGER REFERENCES questionnaires(questionnaire_id) ON DELETE CASCADE,
    user_id INTEGER REFERENCES users(user_id) ON DELETE CASCADE,
    answer INTEGER NOT NULL
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
const getAllAnswers = async () => {
    try {
        const answers = await db.any("SELECT * FROM answers");
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
const getAllAnswersBySingleUserID = async (id) => {
    try{
        const answers = await db.any(`SELECT * FROM answers WHERE user_id = ${id}`);
        return answers;
    } catch(err) {
        console.error(err);
    }
}

//GET
/**
 * getAllAnswersByQuestionnaireID()
 * =====================================
 * get all rows that related to specific question.
 * 
 * @param {string} id - questionnaire_id
 * @returns 
 */
const getAllAnswersByQuestionnaireID = async (id) => {
    try{
        const answers = await db.any(`SELECT * FROM answers WHERE questionnaire_id = '${id}'`);
        return answers;
    } catch(err){
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
const createNewAnswer = async (item) => {
    const { questionnaire_id, user_id, answer } = item;

    try {
        const newAnswer = await db.one("INSERT INTO answer (questionnaire_id, user_id, answer) VALUES ($1, $2, $3) RETURNING *", [questionnaire_id, user_id, answer]);
        return newAnswer;
    } catch(err){
        console.error(err);
    }
}

//PUT "/:id"
const updateAnswerById = async(id, item) => {
    const { questionnaire_id, user_id, answer } = item;
    
    try {
        const updatedAnswer = await db.one(`UPDATE answers SET questionnaire_id=$1, user_id=$2, answer=$3 WHERE answer_id = ${id} RETURNING *`,[questionnaire_id, user_id, answer]);
        return updatedAnswer;
    } catch(err){
        console.error(err);
    }
}

//DELETE "/:id"
const deleteAnswerById = async(id) => {
    try {
        const deletedAnswer = await db.one(`DELETE FROM answer WHERE answer_id = ${id} RETURNING *`);
        return deletedAnswer;
    } catch(err){
        console.error(err);
    }
}