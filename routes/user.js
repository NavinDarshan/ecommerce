const express = require('express')
const Route = express.Router();
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/user');
const Order = require('../models/orders')
const passport = require('passport');
const keys = require('../config/key')

Route.post("/register", (req, res) => {
    console.log("api entered")
    User.findOne({ email: req.body.email }).then(user => {
        if (user) {
            return res.status(400).json({ email: "Email already Exists" });
        } else {
            const newUser = new User({
                email: req.body.email,
                password: req.body.password
            });
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if (err) throw err;
                    newUser.password = hash;
                    newUser.save()
                        .then(user => { console.log(user), res.json(user) })
                        .catch(err => console.log(err));
                })
            })
        }
    })
})

Route.post("/login", (req, res) => {
    const email = req.body.email;
    const password = req.body.password

    User.findOne({ email: email }).then(user => {
        console.log("user")
        console.log(user)
        if (!user) {
            return res.status(400).json({ emailNotFound: "EmailNotFound" })
        }
        console.log("login user")
        console.log(user)
        console.log(user.email)
        bcrypt.compare(password, user.password).then(isMatch => {
            if (isMatch) {
                const payload = {
                    id: user.id,
                    name: user.name,
                    email: user.email
                };
                jwt.sign(
                    payload,
                    keys.secretOrKey,
                    {
                        expiresIn: 31556926 // 1 year in seconds
                    },
                    (err, token) => {
                        res.json({
                            success: true,
                            token: "Bearer " + token,
                            user: user
                        });
                    }
                );
            } else {
                return res
                    .status(400)
                    .json({ passwordincorrect: "Password incorrect" });
            }
        }
        )
    });
});
Route.post("/postproducts", (req, res) => {
    console.log("req.body")
    console.log(req.body)
    const newProduct = new Products({
        productName: req.body.productName,
        price: req.body.price,
        category: req.body.category
    })
        .save()
    console.log("new Product")
    console.log(newProduct)
})
Route.get("/products", (req, res) => {
    Products.find({ category: "phone" }, (err, products) => {
        if (err) {
            console.log(err)
        } else {
            res.json(products)
            console.log(products);
        }
    })
})
Route.post("/cartadd", (req, res) => {
    console.log("entered")
    const email = req.body.email;
    console.log(req.body.product)
    console.log(req.body.product._id)
    User.findOne({ email: email }, (err, foundUser) => {
        if (err) {
            console.log(err)
        } else {
            foundUser.cart.push(req.body.product._id)
            foundUser.save((err, save) => {
                if (err) {
                    console.log(err)
                } else {
                    console.log("added to cart")
                }
            })
        }
    })
})
Route.get("/cart/:id", (req, res) => {
    User.findById(req.params.id)
        .populate("cart")
        .exec((err, usercart) => {
            if (err) {
                console.log(err)
            } else {
                console.log(usercart)
                res.send(usercart)
            }
        })
})
Route.post("/cartdelete", (req, res) => {
    console.log("entered");
    User.findById((req.body.userid), (err, foundUser) => {
        if (err) {
            console.log(err)
        }
        else {
            // console.log("start")
            // console.log(foundUser)
            // console.log("1")
            foundUser.cart.pull(req.body.product._id)
            foundUser.save((err, save) => {
                if (err) {
                    console.log(err)
                } else {
                    // console.log(foundUser)
                    // console.log("its end")
                    res.send("success")
                }
            })
        }

    })
})
Route.post("/order", (req, res) => {
    User.findById((req.body.userid), (err, foundUser) => {
        if (err) {
            console.log(err)
        } else {

            foundUser.order.push(req.body.product._id)
            foundUser.save((err, save) => {
                if (err) {
                    console.log(err)
                } else {
                    console.log("Orders")
                }
            })

        }
    })
})

Route.get("/order/:id", (req, res) => {
    console.log("entered")
    User.findById(req.params.id)
        .populate("order")
        .exec((err, userorders) => {
            if (err) {
                console.log(err)
            } else {
                console.log("2")
                console.log(userorders)
                res.send(userorders)
            }
        })
})


module.exports = Route