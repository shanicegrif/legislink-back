const express = require("express");
const { getAllUsers, getSingleUser, searchUserByEmail, createNewUser, updateUserById, deleteUserById } = require("../queries/users");
const users = express.Router();
const bcrypt = require("bcryptjs");

/**
 * TODO: 
 * implementing bcrypt
 * messages for nodemon (using console.log)
 * update middlewares for validation
 */

/** get */
users.get("/", async (req, res) => {
    const userQuery = await getAllUsers();
    console.log(userQuery);
    if(userQuery){
        //no query, show everything
        res.status(200).json({ success: true, data: { payload: [...userQuery] } });
    }
    else{
        //do something for queries
        res.status(200).json({ success: false, data: { error: "Server Error - we didn't do it!" } });
    }
});

users.get("/:id", async (req, res) => {
    const { id } = req.params;
    console.log("id is ..." + id)
    const user = await getSingleUser(id);
    console.log(user)
    if(user){
        //no query, show everything
        res.status(200).json({ success: true, data: { payload: user } });
    }
    else{
        //do something for queries
        res.status(404).json({ success: false, data: { error: "Server Error - we didn't do it!" } });
    }
});

/**
 * TODO: need to apply bcrypt for validation
 */
users.post("/login", async (req,res) => {
    try{
        //search the user from db.
        const user = await searchUserByEmail(req.body.user_email);
        console.log(user)

        if(user){
            const isMatch = await bcrypt.compare(req.body.user_password, user.user_password);
            if(isMatch){
                //return something
                console.log(user)
                res.status(200).json({ success: true, data: { payload: user } });
            } 
            else {
                res.status(401).json({ error: "Invalid credentials" });
            }
        }
        else{
            res.status(404).json({error: "The account does not exist"});
        }
    } catch(error){
        res.status(400).json({error: "something missing"});
    }
});

users.post("/", async (req, res) => {
    const { user_email, user_password, user_zipcode } = req.body;
    const salt = await bcrypt.genSalt();
    const hashedPW = await bcrypt.hash(user_password, salt);
    //const hashedEmail = await bcrypt.hash(user_email, salt);
    const item = {
        user_email : user_email,
        user_password : hashedPW,
        user_zipcode : user_zipcode
    };
    try{
        const user = await createNewUser(item);
        console.log(user)
        res.json(user);
    } catch(error) {
        res.status(400).json({error: "something missing in your header"});
    }
});

users.put("/:id", async (req, res) => {
    const { id } = req.params;
    console.log(req.body);
    try{
        const user = await updateUserById(id, req.body);
        console.log("hello")
        console.log(user)
        res.status(200).json({success: true, data: { payload: user } })
    } catch(err){
        res.status(400).json({error: "something missing in your header"});
    }
})


/** delete */
users.delete("/:id", async (req, res) => {
    const { id } = req.params;
    const user = await deleteUserById(id);
    if(user){
        res.status(200).json(user);
    }
    else{
        res.status(404).json("wrong");
    }
});

/** page 404 */
users.get("*", (req, res) => {
    res.status(404).send("with incorrect id - sets status to 404 and returns error key");
});

module.exports = users;