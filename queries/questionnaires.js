/*
CREATE TABLE questionnaires (
    questionnaire_id SERIAL PRIMARY KEY,
    questionnaire_topic TEXT
);

//GET "/"
/**
 * getAllQuestions()
 * ===========================
 * get all rows from the "answers".
 * 
 * @returns {Object}
 */
const getAllQuestions = async () => {
    try {
        const questions = await db.any("SELECT * FROM questionnaires");
        return questions;
    } catch(err) {
        console.error(err);
    }
}

//POST
/**
 * createNewQuestions()
 * ============================
 * create a new row for the "answers"
 * 
 * @param {object} item 
 * @returns 
 */
const createNewQuestions = async (item) => {
    const { questionnaire_topic } = item;

    try {
        const newQuestion = await db.one("INSERT INTO questionnaires (questionnaire_topic) VALUES ($1) RETURNING *", [questionnaire_topic]);
        return newQuestion;
    } catch(err){
        console.error(err);
    }
}


const updateQuestionById = async(id, item) => {
    const { questionnaire_topic } = item;
    
    try {
        const updatedQuestion = await db.one(`UPDATE questionnaires SET questionnaire_topic=$1 WHERE questionnaire_id = ${id} RETURNING *`,[questionnaire_topic]);
        return updatedQuestion;
    } catch(err){
        console.error(err);
    }
}

//DELETE "/:id"
const deleteQuestionById = async(id) => {
    try {
        const deletedQuestion = await db.one(`DELETE FROM questionnaires WHERE questionnaire_id = ${id} RETURNING *`);
        return deletedQuestion;
    } catch(err){
        console.error(err);
    }
}

module.exports = {
    getAllQuestions,
    createNewQuestions,
    updateQuestionById,
    deleteQuestionById,
}