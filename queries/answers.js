const db = require("../db/dbConfig.js");

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

/**
 * *********************
 * TODO: put some console.log to print a message for nodemon
 * *********************
 */

//GET "/"
const getAllAnswers = async () => {
    try {
        const answers = await db.any("SELECT * FROM answers");
        return answers;
    } catch(err) {
        console.error(err);
    }
}

//GET 
const getAllAnswersBySingleUserID = async (id) => {
    try{
        const answers = await db.any(`SELECT * FROM answers WHERE user_id = ${id}`);
        return answers;
    } catch(err) {
        console.error(err);
    }
}

//GET
const getAllAnswersByQuestionnaireID = async (id) => {
    try{
        const answers = await db.any(`SELECT * FROM answers WHERE questionnaire_id = '${id}'`);
        return answers;
    } catch(err){
        console.error(err);
    }
}

/** not finished */

//POST
const createNewAnswer = async (item) => {
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