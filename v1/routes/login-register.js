const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require('../../db/models').user;
const sequelize = require('sequelize');
const { check, validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');


router.post("/signup", [
        check('phone').isLength({ min: 10, max:10 }).not().isEmpty().trim().escape(),
        check('password').isLength({ min: 6 }).not().isEmpty().trim().escape(),
        check('name').isLength({ min: 2 }).not().isEmpty().trim().escape()
    ], (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }    
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
            return res.status(409).json({
                status: "Failed",
                message: "Already registed please login or reset your password"
            });
          }else{
            bcrypt.hash(password, 10, (err, hash) =>{
                if(err){
                    return res.status(500).json({
                      error: err
                    });
                }
                else{
                    User.create({
                        name: name,
                        password: hash,
                        phone: phone
                    }).then(doc => {
                        var dataValues = doc.dataValues
                        return res.status(200).json({
                            status: "Success",
                            message: "Registered Successfully",
                            body: dataValues
                        })
                        
                    }) 
                    .catch(function (err) {
                        return res.status(500).json({
                            error: err
                        });
                    })
                }
            })
            
          }
          
      });
});

router.post("/login", [
    check('phone').isLength({ min: 10, max:10 }).not().isEmpty().trim().escape(),
    check('password').isLength({ min: 6 }).not().isEmpty().trim().escape()
], (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }    
    var phone = req.body.phone;
    var password = req.body.password;

    // bcrypt.compare(myPlaintextPassword, hash, function(err, res) {
    //     // res == true
    // });

    User.findOne({
        where: {
            phone: phone
        }
    }).then(doc =>{
        if(doc == null){
            return res.status(404).json({
                status: "Failed",
                message: "Not found! Please register"
            });
        }
        else{

            var userDetails = doc.dataValues;
            var id = userDetails.id;
            var name = userDetails.name;
            var databserpassword = userDetails.password;
            var phone = userDetails.phone;

            bcrypt.compare(password, databserpassword, function(err, result) {
                if(result){

                    const token = jwt.sign(
                        {
                          name: name,
                          phone: phone,
                          id: id
                        },
                        process.env.JWT_KEY,
                        {
                            expiresIn: 60 * 60 * 24 * 12
                        }
                      );

                    return res.status(200).json({
                        userDetails,
                        token:token
                    });
                }
                if(err){
                    return res.status(500).json({
                        error: err
                    })
                }
            });

            

            
        }
        
    }).catch(function (err) {
            return res.status(500).json({
            error: err
        });
    })

});





module.exports = router;