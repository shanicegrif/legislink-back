const express = require("express");
const questionnaires = express.Router();
const { getAllQuestions, createNewQuestions, updateQuestionById, deleteQuestionById } = require('../queries/questionnaires.js');

/** GET */
questionnaires.get("/", async (req, res) => {
    console.log("id is ..." + id)
    const question = await getAllQuestions();
    console.log(question)
    if(question){
        //no query, show everything
        res.status(200).json({ success: true, data: { payload: [...question] } });
    }
    else{
        //do something for queries
        res.status(404).json({ success: false, data: { error: "Server Error - we didn't do it!" } });
    }
});

/** POST */
questionnaires.post("/", async (req, res) => {
    try{
        const question = await createNewQuestions(req.body);
        console.log(question)
        res.json(question);
    } catch(error) {
        res.status(400).json({error: "something missing in your header"});
    }
});

/** PUT */
questionnaires.put("/:id", async (req, res) => {
    const { id } = req.params;
    console.log(req.body);
    try{
        const question = await updateQuestionById(id, req.body);
        console.log(question)
        res.status(200).json({success: true, data: { payload: question } })
    } catch(err){
        res.status(400).json({error: "something missing in your header"});
    }
});

/** DELETE */
questionnaires.delete("/:id", async (req, res) => {
    const { id } = req.params;
    const question = await deleteQuestionById(id);
    if(question){
        res.status(200).json(question);
    }
    else{
        res.status(404).json("wrong");
    }
});

/** 404 */
/** page 404 */
questionnaires.get("*", (req, res) => {
    res.status(404).send("with incorrect id - sets status to 404 and returns error key");
});
