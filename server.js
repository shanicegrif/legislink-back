// DEPENDENCIES
const app = require("./app.js");

// CONFIGURATION : default port is 3333
require("dotenv").config();
const PORT = process.env.PORT || 3333;

const { authenticate } = require('./middleware/authMiddleware');

app.get('/api/secure-resource', authenticate, (req, res) => {
  res.json({ message: 'This is a secure resource!' });
});


// LISTEN
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});