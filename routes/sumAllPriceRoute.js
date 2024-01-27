const express = require("express");
const router = express.Router();
const cors = require("cors");
const bodyParser = require("body-parser");
const User = require("../model/user");
const Product = require("../model/product");

// middleware to parse json in the request body
router.use(bodyParser.json());
// Enable CORS for all routes
router.use(cors());

router.get("/getTotalPrice/:id", async (req, res) => {
  try {
    // Extract user ID from the request parameters
    const userId = req.params.id;
    // Find the user by ID
    const user = await User.findById(userId);
    
    // Extract the user's cart items
    const cart = user.userCart.cartItems;


    // Fetch products corresponding to each ID in the cart array
    const products = await Promise.all(
      cart.map((cartItem) => Product.findOne(cartItem.productId))
    );

    // console.log(products)
    // Extract prices from each product
    const productPrices = products.map((product) => product.price);
    // Calculate the total price by summing up the product prices
    const totalPrice = productPrices.reduce((acc, price) => acc + price, 0);

    // Update the user's Subtotal property in the userCart object
    await User.findByIdAndUpdate(userId, { "userCart.subtotal": totalPrice });

    // Respond with the total price
    res.status(200).json(totalPrice);

    // console.log(totalPrice); 
  } catch (err) {
    // Handle errors
    console.error("Error getting Total Price", err.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Export router
module.exports = router;
