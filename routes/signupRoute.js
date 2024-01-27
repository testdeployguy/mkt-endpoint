const express = require("express");
const router = express.Router();
const cors = require("cors");
const bodyParser = require("body-parser");
const User = require("../model/user");
const nodemailer = require("nodemailer");

// middleware to parse json in the request body
router.use(bodyParser.json());
// Enable CORS for all routes
router.use(cors());

router.post("/signup", async (req, res) => {
  try {
    const formData = req.body;

    // check if user already exists
    const emailExisit = await User.findOne({ email: formData.email }).exec();
    const userNameExisit = await User.findOne({
      userName: formData.userName,
    }).exec();

    errorMsg = [];

    if (userNameExisit) {
      errorMsg.push("user name already taken");
    }
    if (emailExisit) {
      errorMsg.push("user with this email already exist");
    }

    if (errorMsg.length > 0) {
      return res.status(409).json({ errors: errorMsg });
    }
    const user = await User.create(formData);
    const UserId = user._id;
    const recipientEmail = user.email;
    const recipientUserName = user.userName;

    // Send message to user's email if email is successfull
    if (user) {
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
        subject: "just a mailer test",
        text: "Plaintext version of the message",
        html: `<p>Hello ${recipientUserName}, just testing this nodemailer with elastic email, only to see that its a pain in the ass</p>`,
      };

      const info = await transporter.sendMail(messageOptions);
      console.log("email sent to:", recipientEmail);
    }
    //*******************************//
    res.status(201).json({ _id: UserId });
    console.log("New user created successfully", user);
  } catch (err) {
    console.error("Failed to create new user", err.message);
    res.status(500).json({ error: "Failed to create new user" });
  }
});

// Export router
module.exports = router;
