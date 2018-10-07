const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require('../../db/models').user;
const Blog = require('../../db/models').blog;
const Sequelize = require('sequelize');
// const Blog = require('../../db/models').like;
const Count = require('../../db/models').count;
const Category = require('../../db/models').category;
const Visit = require('../../db/models').visit;
const Like = require('../../db/models').like;
const LikeVeiwCount = require('../helper/likeViewCount');
const ForgotPassword = require('../../db/models').forgot_password;
const { check, validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');

const http = require('http');
var request = require('request');
// router.get("/test/:ID", (req, res, next) => {
//     blogID = req.params.ID;
//     var blog =  LikeVeiwCount.likeViewCount(blogID);
//     res.send(blog);
    
    
// })

// all of my express stuff goes here and eventually i setup my route below



router.post('/forgot_pass_new_pass', [check('new_pass').isLength({ min: 4 }).not().isEmpty().trim().escape(),],
 (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty){
        return res.status(422).json({ errors: errors.array() });
    }

    const new_pass = req.body.new_pass;
    const phone = req.body.phone;
    bcrypt.hash(new_pass, 10, (err, hash) =>{
        if(err){
            return res.status(500).json({
              error: err
            });
        }
        else{
            console.log(new_pass);
            console.log(hash);
            


            User.update({ 
                password: hash
            },
            { 
                where: { 
                    phone: phone
                } 
            })
            .then(result => {
                // update all the entry in forgot_password table
                ForgotPassword.update({ 
                    status: 1
                },
                { 
                    where: { 
                        phone: phone
                    } 
                })
                
                return res.status(200).json({
                    status: "Success",
                    message: "Password changed sucessfully",
                    result
                });
            })
            .catch(err => {
                return res.status(500).json({
                    error: err
                })
            })
        }
    })


});


router.post('/forgot_pass_code', [check('phone').isLength({ min: 10, max:10 }).not().isEmpty().trim().escape(),
                                check('phone').not().isEmpty().trim().escape(),],
 (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty){
        console.log(errors);
        return res.status(422).json({ errors: errors.array() });
       
    }
    const phone = req.body.phone;
    const code  = req.body.code;
    ForgotPassword.findAll({
        distinct: true,
        order: [ [ 'id', 'DESC' ] ],
        limit:1,
        where: {
            phone: phone,
            code: code,
            status: 0
        }
      })
      .then(doc => {
        if(doc.length==1) {
            return res.status(200).json({ 
                
                    status: "Success",
                    message: "Code verified"
                
             });
          } else {
            return res.status(404).json({ 
                error: {
                    status: "Failed",
                    message: "Wrong code entered"
                }
             });
          }
      })
      .catch(function (err) {
        return res.status(500).json({
        error: err
    });
})
      
});

router.get("/abc", (req, res, next) => {
    
    
        
    })

router.post('/forgot_pass_phone', [check('phone').isLength({ min: 10, max:10 }).not().isEmpty().trim().escape(),],
 (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty){
        return res.status(422).json({ errors: errors.array() });
    }

    const phone = req.body.phone;
    User.findOne({
        where: {
            phone: phone
        }
      })
      .then(doc => {
        if(doc) {
            const code = Math.floor(1000 + Math.random() * 9000);
            //insert data in table
            //send the sms
            //return the response
            ForgotPassword.create({
               
                phone: phone,
                code: code,
                status: 0
            })
            .then(result => {
                //send the sms
                let msg = code+ ' OPT For Shyari Sea ';
                let url = 'http://my.msgwow.com/api/sendhttp.php?authkey='+process.env.MSGWOW_TOKEN+'&mobiles='+phone+'&message='+msg+'&sender=SHYSEA&route=4&country=91'
                request(url, function (error, response, body) {
                    console.log('error:', error); // Print the error if one occurred
                    console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
                    console.log('body:', body); // Print the HTML for the Google homepage.
                  });

                return res.status(200).json({
                    status: "Success",
                    message: "Code Sent",
                    userData: doc,
                    body: result
                })
            }) 
            .catch(function (err) {
                return res.status(500).json({
                    error: err
                });
            })
          } else {
            return res.status(404).json({ 
                error: {
                    status: "Failed",
                    message: "Phone number not found"
                }
             });
          }
      })
      .catch(function (err) {
            return res.status(500).json({
            error: err
        });
    })
});


router.post('/forgot_pass_code', [check('phone').isLength({ min: 10, max:10 }).not().isEmpty().trim().escape(),
                                check('phone').not().isEmpty().trim().escape(),],
 (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty){
        console.log(errors);
        return res.status(422).json({ errors: errors.array() });
       
    }
    const phone = req.body.phone;
    const code  = req.body.code;
    ForgotPassword.findAll({
        distinct: true,
        order: [ [ 'id', 'DESC' ] ],
        limit:1,
        where: {
            phone: phone,
            code: code,
            status: 0
        }
      })
      .then(doc => {
        if(doc.length==1) {
            return res.status(200).json({ 
                
                    status: "Success",
                    message: "Code verified"
                
             });
          } else {
            return res.status(404).json({ 
                error: {
                    status: "Failed",
                    message: "Wrong code entered"
                }
             });
          }
      })
      .catch(function (err) {
            return res.status(500).json({
            error: err
        });
    })
});


router.post("/signup", [
        check('phone').isLength({ min: 10, max:10 }).not().isEmpty().trim().escape(),
        check('password').isLength({ min: 4 }).not().isEmpty().trim().escape(),
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
          } else {
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
    check('password').isLength({ min: 4 }).not().isEmpty().trim().escape()
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
                else{
                    res.status(500).json({
                        status: "Failed",
                        message: "Incorrect password and phone match"
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