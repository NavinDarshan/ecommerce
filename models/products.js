const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const productSchema = new Schema({
   productName: {
     type: String,
   },
   category: {
    type: String,
  },
  price: {
    type: Number,
  }
});

module.exports = Products = mongoose.model("products", productSchema);