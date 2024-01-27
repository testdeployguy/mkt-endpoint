const express = require("express");
const router = express.Router();
const cors = require("cors");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");

// middleware to parse json in the request body
router.use(bodyParser.json());
// Enable CORS for all routes
router.use(cors());

router.post("/sendEmail", async (req, res) => {
  try {
    const formData = req.body;
    const recipientEmail = formData.email;
    const recipientUserName = formData.userName;
    const subject = formData.subject;
    const body = formData.msg;

    // Send message to user's email if email is successfull
    // Configure Nodemailer transporter
    const transporter = nodemailer.createTransport({
      host: "smtp.elasticemail.com",
      port: 2525,
      secure: false,
      auth: {
        user: "nodemailer2446@gmail.com",
        pass: "E6B24B9C4458D0CD13339DF23BFFC9D9E45F",
      },
    });

    const messageOptions = {
      from: "nodemailer2446@gmail.com",
      to: recipientEmail,
      subject: subject,
      text: body,
      html: `<p>Hello ${recipientUserName}, ${body}</p>`,
    };

    const info = await transporter.sendMail(messageOptions);
    console.log("email sent to:", recipientEmail);
  } catch (err) {
    console.error("Failed to send email", err.message);
  }
});

module.exports = router;
