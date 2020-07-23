const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const UserSchema = new Schema({
//   name: {
//     type: String,
//     required: true
//   },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  cart :[{
    type : mongoose.Schema.Types.ObjectId,
    ref : "Product"
  }],
  order : [{
    type : mongoose.Schema.Types.ObjectId,
    ref : "Product"
  }]
});

module.exports = User = mongoose.model("users", UserSchema);

// const mongoose = require('mongoose')
// const loginSchema = new mongoose.Schema({
//     name : String,
//     email : String,
//     password : String
// });
// mongoose.exports = User =  mongoose.model("users" , loginSchema);