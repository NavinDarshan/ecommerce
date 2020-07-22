const express = require('express')
const passport = require('passport');
const mongoose = require('mongoose');
mongoose.connect("mongodb://localhost/ecommerce" , {useNewUrlParser: true, useUnifiedTopology: true});
const bodyParser = require('body-parser')
const app = express();
const users = require('./routes/user')
const Products = require('./routes/Product')

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(passport.initialize());

// Passport config
require("./config/passport")(passport);

// Routes
app.use("/api/user", users);
app.use("/api/product",Products)

const port = 5000;

app.listen(port, () => console.log(`Server up and running on port ${port} !`));
