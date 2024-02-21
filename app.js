const express = require("express");
const cors = require("cors");
const app = express();
//TODO: import controllers.

//middlewares 
app.use(cors());
app.use(express.json());

// root
app.get("/", (request, response) => {
    //TODO: better welcome messages are required.
    response.send("Hello World!");
});

//TODO: need to setup routers.
//app.use("", forums);

// 404 Page not found
app.get("*", (req, res) => {
    res.status(404).json({ error: "Page not found" });
});

module.exports = app;