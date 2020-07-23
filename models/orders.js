const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  productname : {
      type : String
  },
  productprice : {
      type : String
  }
});

module.exports = orders = mongoose.model("orders", orderSchema);
