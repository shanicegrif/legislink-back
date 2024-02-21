// DEPENDENCIES
const app = require("./app.js");

// CONFIGURATION : default port is 3333
require("dotenv").config();
const PORT = process.env.PORT || 3333;

// LISTEN
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});