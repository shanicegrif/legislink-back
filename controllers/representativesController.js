const express = require("express");
const representatives = express.Router();
const {
    getAllRepresentatives,
    deleteRepresentativeById,
    updateRepresentativeById,
    createNewRepresentativesByFetching,
    getAllRepresentativesByID
} = require('../queries/representatives');

representatives.get("/", async (req, res) => {
    const representativesData = await getAllRepresentatives();
    console.log(representativesData)
    if(representativesData){
        //no query, show everything
        res.status(200).json({ success: true, data: { payload: [...representativesData] } });
    }
    else{
        //do something for queries
        res.status(404).json({ success: false, data: { error: "Server Error - we didn't do it!" } });
    }
});

representatives.get("/:id", async (req, res) => {
    const { id } = req.params;
    const representativesData = await getAllRepresentativesByID(id);
    console.log(representativesData)
    if(representativesData){
        //no query, show everything
        res.status(200).json({ success: true, data: { payload: [...representativesData] } });
    }
    else{
        //do something for queries
        res.status(404).json({ success: false, data: { error: "Server Error - we didn't do it!" } });
    }
});

/** POST */
representatives.post("/", async (req, res) => {
    try{
        createNewRepresentativesByFetching();
        res.json({ success: true, data: {message: "fetched from api"}});
    } catch(error) {
        res.status(400).json({error: "something missing in your header"});
    }
});

/** PUT */
representatives.put("/:id", async (req, res) => {
    const { id } = req.params;
    console.log(req.body);
    try{
        const question = await updateRepresentativeById(id, req.body);
        console.log(question)
        res.status(200).json({success: true, data: { payload: question } })
    } catch(err){
        res.status(400).json({error: "something missing in your header"});
    }
});

/** DELETE */
representatives.delete("/:id", async (req, res) => {
    const { id } = req.params;
    const question = await deleteRepresentativeById(id);
    if(question){
        res.status(200).json(question);
    }
    else{
        res.status(404).json("wrong");
    }
});

/** 404 */
/** page 404 */
representatives.get("*", (req, res) => {
    res.status(404).send("with incorrect id - sets status to 404 and returns error key");
});

module.exports = representatives;