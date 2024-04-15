const Resend = require('resend');
const express = require("express");
const email = express.Router();

const resend = new Resend(process.env.RESEND_API_KEY);

email.get('/', async (req, res) => {
    try {
        const data = await resend.emails.send({
          from: `${req.body.displayName} <${req.body.email}>`,
          to: ['delivered@resend.dev'],
          subject: 'Hello World',
          html: '<strong>it works!</strong>',
        });
    
        res.status(200).json(data);
    } catch(error) {
        res.status(400).json(error);
    }
});

email.get("*", (req, res) => {
    res.status(404).send("with incorrect parameter - sets status to 404 and returns error key");
});

module.exports = email;