const express = require("express");
const cors = require("cors");
const app = express();
const users = require("./controllers/usersController.js");
const senates = require("./controllers/senatesController.js");
//TODO: import controllers.

//middlewares 
app.use(cors());
app.use(express.json());

//TODO: need to setup routers.
app.use("/users", users);
app.use("/senates", senates);

// root
app.get("/", (request, response) => {
    //TODO: better welcome messages are required.
    response.send("Hello World!");
});

// 404 Page not found
app.get("*", (req, res) => {
    res.status(404).json({ error: "Page not found" });
});

module.exports = app;