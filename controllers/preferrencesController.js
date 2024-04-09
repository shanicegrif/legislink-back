const express = require("express");
const { getAllPreferrencesBySingleUserID, createNewPreferrence, updatePreferrenceById } = require("../queries/preferrences");
const preferrences = express.Router();

/*
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
});*/

preferrences.get("/:id", async (req, res) => {
    const { id } = req.params;

    const question = await getAllPreferrencesBySingleUserID(id);
    if(question){
        //no query, show everything
        res.status(200).json({ success: true, data: { payload: [...question] } });
    }
    else{
        //do something for queries
        res.status(404).json({ success: false, data: { error: "Server Error - we didn't do it!" } });
    }
});

preferrences.post("/:id", async (req, res) => {
    const { id } = req.params;
    console.log("id is")
    console.log(id);
    console.log(req.body)
    try{
        const question = await createNewPreferrence(id, req.body);
        console.log(question)
        res.json(question);
    } catch(error) {
        res.status(400).json({error: "something missing in your header"});
    }
});

preferrences.put("/:id", async (req, res) => {
    const { id } = req.params;
    console.log(req.body);
    try{
        const user = await updatePreferrenceById(id, req.body);
        console.log("hello")
        console.log(user)
        res.status(200).json({success: true, data: { payload: user } })
    } catch(err){
        res.status(400).json({error: "something missing in your header"});
    }
})


/** delete 
preferrences.delete("/:id/:word", async (req, res) => {
    const { id, word } = req.params;
    const user = await deleteInterestsById(id, word);
    if(user){
        res.status(200).json(user);
    }
    else{
        res.status(404).json("wrong");
    }
});
*/

/** page 404 */
preferrences.get("*", (req, res) => {
    res.status(404).send("with incorrect id - sets status to 404 and returns error key");
});

module.exports = preferrences;