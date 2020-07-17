const express = require('express')
const Route = express.Router();
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/user');
const passport = require('passport');
const keys = require('../config/key')

Route.post("/register" , (req , res) =>{
    console.log("api entered")
    User.findOne({email : req.body.email}).then(user => {
        if(user){
            return res.status(400).json({email : "Email already Exists"});
        }else{
            const newUser = new User({
                email : req.body.email,
                password : req.body.password
            });
            bcrypt.genSalt(10,(err , salt) =>{
                bcrypt.hash(newUser.password,salt,(err,hash) =>{
                    if(err) throw err;
                    newUser.password = hash;
                    newUser.save()
                    .then(user => {console.log(user) , res.json(user)})
                    .catch(err => console.log(err));
                })
            })
        }
    })
})

Route.post("/login" , (req ,res) =>{
    const email = req.body.email;
    const password = req.body.password

    User.findOne({email:email}).then(user =>{
        console.log("user")
        console.log(user)
        if(!user){
            return res.status(400).json({emailNotFound : "EmailNotFound"})
        }
        console.log("login user")
        console.log(user)
        bcrypt.compare(password , user.password).then(isMatch => {
            if(isMatch){
                const payload = {
                    id:user.id,
                    name : user.name
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
                        token: "Bearer " + token
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

module.exports = Route