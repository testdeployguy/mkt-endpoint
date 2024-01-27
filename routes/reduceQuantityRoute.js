
const express = require("express");
const router = express.Router();
const cors = require("cors");
const bodyParser = require("body-parser");
const User = require("../model/user");

// middleware to parse json in the request body
router.use(bodyParser.json());
// Enable CORS for all routes
router.use(cors());

router.post("/reduceProductQuantity", async (req, res) => {
  try {
    const userId = req.body.userId;
    const productId = req.body.productId;

    const user = await User.findById(userId);
    const cartItems = user.userCart.cartItems;

    // Find the item in cartItems array with the matching productId
    const item = cartItems.find(
      (item) => item.productId.toString() === productId
    );

    if (item) {
      // If the item is found, you can access its properties

      item.quantity -= 1;
      const productQuantity = item.quantity;

      // Save the updated user data
      await user.save();

      res.status(200).json(productQuantity);
      // console.log("product quantity:", productQuantity);
    } else {
      console.log("Item not found in the cartItems array.");
    }
  } catch (err) {
    console.error("Failed to add quantity", err.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Export router
module.exports = router;