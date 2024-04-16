const {Resend} = require('resend');
const express = require("express");
const email = express.Router();

const resend = new Resend(process.env.RESEND_API_KEY);

email.post('/', async (req, res) => {
    //change to: to your own resend api email
    try {
        const data = await resend.emails.send({
          from: 'Acme <onboarding@resend.dev>',
          to: ["sungyi@pursuit.org"],
          subject: `${req.body.subject}`,
          html: req.body.htmlContent,
        });
        console.log(data);
        res.status(200).json(data);
    } catch(error) {
        res.status(400).json(error);
    }
});

email.get("*", (req, res) => {
    res.status(404).send("with incorrect parameter - sets status to 404 and returns error key");
});

module.exports = email;