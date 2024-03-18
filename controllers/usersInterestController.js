const express = require("express");
const keywords = express.Router();
const {
    getAllInterests,
    deleteInterestsById,
    updateInterestsById,
    createNewInterests,
    getAllInterestsBySingleUserID,
} = require('../queries/userInterests');

keywords.get("/", async (req, res) => {
    const question = await getAllInterests();
    if(question){
        //no query, show everything
        res.status(200).json({ success: true, data: { payload: [...question] } });
    }
    else{
        //do something for queries
        res.status(404).json({ success: false, data: { error: "Server Error - we didn't do it!" } });
    }
});

keywords.get("/:id", async (req, res) => {
    const { id } = req.params;

    const question = await getAllInterestsBySingleUserID(id);
    if(question){
        //no query, show everything
        res.status(200).json({ success: true, data: { payload: [...question] } });
    }
    else{
        //do something for queries
        res.status(404).json({ success: false, data: { error: "Server Error - we didn't do it!" } });
    }
});

keywords.post("/", async (req, res) => {
    try{
        const question = await createNewInterests(req.body);
        console.log(question)
        res.json(question);
    } catch(error) {
        res.status(400).json({error: "something missing in your header"});
    }
});

keywords.put("/:id", async (req, res) => {
    const { id } = req.params;
    console.log(req.body);
    try{
        const user = await updateInterestsById(id, req.body);
        console.log("hello")
        console.log(user)
        res.status(200).json({success: true, data: { payload: user } })
    } catch(err){
        res.status(400).json({error: "something missing in your header"});
    }
})


/** delete */
keywords.delete("/:id", async (req, res) => {
    const { id } = req.params;
    const user = await deleteInterestsById(id);
    if(user){
        res.status(200).json(user);
    }
    else{
        res.status(404).json("wrong");
    }
});

/** page 404 */
keywords.get("*", (req, res) => {
    res.status(404).send("with incorrect id - sets status to 404 and returns error key");
});

module.exports = keywords;