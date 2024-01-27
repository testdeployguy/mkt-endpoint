// Enable CORS for for all routes
// middleware to parse json in the request body

const express = require('express');
const router = express.Router();
const cors = require('cors');
const bodyParser = require('body-parser');
const User = require('../model/user');


// middleware to parse json in the request body
router.use(bodyParser.json());
// Enable CORS for all routes
router.use(cors());


router.get('/allUsers', async (req, res) => {
    try {
        const allUsers = await User.find()

        if(allUsers.length > 0) {
            res.status(200).json(allUsers)
            console.log("all users found")
        }else {
            res.status(404).json({ error: "No users found" })
            console.log("No users found")
        }

    }catch(err) {
        console.error("Error getting all users", err)
    }
})

module.exports = router;
