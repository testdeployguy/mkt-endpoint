const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

const app = express();

// Configure Nodemailer transporter
const transporter = nodemailer.createTransport({
    host: 'smtp.elasticemail.com',
    port: 2525,
    secure: false,
    auth: {
        user: 'nodemailer2446@gmail.com',
        pass: 'E6B24B9C4458D0CD13339DF23BFFC9D9E45F'
    }
});



const messageOptions = {
    from: "nodemailer2446@gmail.com", // Corrected email address
    to: "emmanvictor71@gmail.com",
    subject: "xup bro, go to sleep",
    html: "<b>Xup World?</b>"
}
async function sendEMail() {
        const info =  transporter.sendMail();
}


module.exports = sendEMail()
