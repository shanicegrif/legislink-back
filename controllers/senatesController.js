const express = require("express");
const senates = express.Router();
const {
    getAllSenates,
    deleteSenateById,
    updateSenateById,
    createNewSenatesByFetching,
    getAllSenatesByID,
} = require('../queries/senates');

senates.get("/", async (req, res) => {
    const senatesData = await getAllSenates();
    console.log(senatesData)
    if(senatesData){
        //no query, show everything
        res.status(200).json({ success: true, data: { payload: [...senatesData] } });
    }
    else{
        //do something for queries
        res.status(404).json({ success: false, data: { error: "Server Error - we didn't do it!" } });
    }
});

senates.get("/:id", async (req, res) => {
    const { id } = req.params;
    const senatesData = await getAllSenatesByID(id);
    console.log(senatesData)
    if(senatesData){
        //no query, show everything
        res.status(200).json({ success: true, data: { payload: [...senatesData] } });
    }
    else{
        //do something for queries
        res.status(404).json({ success: false, data: { error: "Server Error - we didn't do it!" } });
    }
});

/** POST */
senates.post("/", async (req, res) => {
    try{
        createNewSenatesByFetching();
        res.json({ success: true, data: {message: "fetched from api"}});
    } catch(error) {
        res.status(400).json({error: "something missing in your header"});
    }
});

/** PUT */
senates.put("/:id", async (req, res) => {
    const { id } = req.params;
    console.log(req.body);
    try{
        const question = await updateSenateById(id, req.body);
        console.log(question)
        res.status(200).json({success: true, data: { payload: question } })
    } catch(err){
        res.status(400).json({error: "something missing in your header"});
    }
});

/** DELETE */
senates.delete("/:id", async (req, res) => {
    const { id } = req.params;
    const question = await deleteSenateById(id);
    if(question){
        res.status(200).json(question);
    }
    else{
        res.status(404).json("wrong");
    }
});

/** 404 */
/** page 404 */
senates.get("*", (req, res) => {
    res.status(404).send("with incorrect id - sets status to 404 and returns error key");
});

module.exports = senates;