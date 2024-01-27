
const express = require("express");
const router = express.Router();
const cors = require("cors");
const bodyParser = require("body-parser");
const User = require("../model/user");
// const nodemailer = require("nodemailer");

// middleware to parse json in the request body
router.use(bodyParser.json());
// Enable CORS for all routes
router.use(cors());





router.get("/user/:id", async (req, res) => {
    try {
      const userId = req.params.id;
      const user = await User.findById(userId);
      res.status(200).json(user);
    } catch (err) {
      console.error("Error finding user", err.message);
      res.status(500).json({ error: "Error finding user" });
    }
  });


  // Export router
  module.exports = router;