const {
    getAllInterestKeywords,
    getSingleInterestKeywordBySingleUserID,
} = require('../queries/interestKeywords');
const express = require("express");
const interestKeywords = express.Router();

interestKeywords.get('/' ,async (req, res) => {
    
    const question = await getAllInterestKeywords();
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

interestKeywords.get('/:id' ,async (req, res) => {
    const { id } = req.params;
    console.log("id is ..." + id)
    const question = await getSingleInterestKeywordBySingleUserID(id);
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

module.exports = interestKeywords;