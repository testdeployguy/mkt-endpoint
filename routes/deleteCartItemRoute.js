const express = require("express");
const router = express.Router();
const cors = require("cors");
const bodyParser = require("body-parser");
const User = require("../model/user");

// middleware to parse json in the request body
router.use(bodyParser.json());
// Enable CORS for all routes
router.use(cors());

router.delete('/deleteCartItemData', async (req, res) => {
  try {
    const productId = req.query.productId;
    const userId = req.query.userId
        
    const user = await User.findByIdAndUpdate(
      userId,
      { $pull: { 'userCart.cartItems': {'productId': productId}}},
      { new: true }); // This option returns the modified document

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    // console.log(user)
    res.status(200).json({ message: '"cart Item deleted"' });
  } catch (err) {
    console.error("Error deleting CartItem", err.message);
    res.status(500).json({ error: "Error deleting CartItem", message: err.message });
  }
});

// Export router
module.exports = router;
