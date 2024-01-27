
const express = require("express");
const router = express.Router();
const cors = require("cors");
const bodyParser = require("body-parser");
const User  = require('../model/user');


// middleware to parse json in the request body
router.use(bodyParser.json());
// Enable CORS for all routes
router.use(cors());


router.get('/getCartItemsData', async (req, res) => {
    try {
        const userId = req.query.userId
        const user = await User.findById(userId);
        const cart = user.userCart.cartItems
        // console.log(userId)


        
        if(cart.length > 0) {
            res.status(200).json(cart)
            // console.log(cart)
        }else if(cart.length == 0) {
            res.status(204).json({message: 'Cart is empty'})
            console.log('cart is empty')
        }
    }catch (err) { 
        // console.error("Error getting CartItems", err.message);
        res.status(500).json({message: err.message})
    }
})

// Export router
module.exports = router

 