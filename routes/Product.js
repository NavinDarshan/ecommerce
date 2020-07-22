const express = require('express')
const app = express();
const formidable = require('formidable');
const fs = require('fs');
const Product = require('../models/products')

app.post('/photo',(req, res) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    //Parses an incoming node.js request containing form data
    console.log("1")
    form.parse(req, (err, fields, files) => {
      if (err) {
        return res.status(400).json({
          error: 'Image could not be uploaded'
        });
      }
  
      let product = new Product(fields);
      console.log("2")
  
      // 1kb = 1000
      // 1mb = 1000000
  
      if (files.photo) {
        // console.log('FILES PHOTO: ', files.photo);
        if (files.photo.size > 1000000) {
          return res.status(400).json({
            error: 'Image should be less than 1 MB in size'
          });
        }
        //read the photo file and save into database
        product.photo.data = fs.readFileSync(files.photo.path);
        product.photo.contentType = files.photo.type;
      }
      console.log("3")
  
      product.save((err, result) => {
        if (err) {
          console.log(err)
          return res.status(400).json({
          });
        }
        res.json(result);
        console.log("4")
      });
    });
  });

app.get("/getphotos" ,(req,res) =>{
  Product.find({} , (err , products) =>{
      if(err){
          console.log(err)
      }else{
          res.send(products);
      }
  })
})

app.get("/photo/:id", (req, res) => {
  Product.findById(req.params.id, (err, notes) => {
      if (err) {
          console.log(err);
      }
      else {
          res.set('Content-Type', 'image/jpeg');
          res.send(notes.photo.data);
          console.log(notes)
      }
  })
})

module.exports = app;