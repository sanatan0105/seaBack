const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require('../../db/models').user;
const sequelize = require('sequelize');

router.post("/signup", (req, res, next) => {
    var name = req.body.name;
    var phone = req.body.phone;
    var password = req.body.password;
    
    User.findAll({
        where: {
            phone: phone
        }
      })
      .then( (doc) => {
          if(doc.length>0){
            res.status(409).json({
                status: "Failed",
                message: "Already registed please login or reset your password"
            });
          }else{
            User.create({
                name: name,
                password: password,
                phone: phone
            }).then(doc => {
                var dataValues = doc.dataValues
                res.status(200).json({
                    status: "Success",
                    message: "Registered Successfully",
                    body: dataValues
                })
                
            }) 
          }
          
      });
});

router.post("/login", (req, res, next) => {
    res.status(200).json({
        phone: req.body.phone,
        password: req.body.password
    });
    
});





module.exports = router;