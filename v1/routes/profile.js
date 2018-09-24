const express = require("express");
const router = express.Router();
const User = require('../../db/models').user;
const Blog = require('../../db/models').blog;
const Visit = require('../../db/models').visit;
const Like = require('../../db/models').like;
const fl = require('../../db/models').fl;
const { check, validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');
const auth = require('../middleware/check_auth');
var ProfileFollow = require('../helper/profileFollow')

const InsetView = require('../helper/viewInsert');
router.get("/:ID", auth, (req, res, next) => {
    visitor_id = req.userData.id;
    user_id = req.params.ID;
    ProfileFollow.FLList(user_id, function(error, count) {
        if ( error ) {
        next(error);
        }
        User.findById(user_id, {
            include: [
              {
                model: Blog,
                include: [
                    Visit, Like
                ],
              }
            ]
          }).then(doc=>{
            // console.log(doc.blogs);
    
            InsetView.insertView(doc.blogs, visitor_id);
            res.status(200).json({
                doc,
                count
            });
          }).catch(err=>{
            next(err);
          }); 
    });
});

//i am a logged in user and i want to follow a person with id ID
router.get("/follow/:ID", auth, (req, res, next)=>{
  var who = req.userData.id;
  var whom = req.params.ID;
  
  if (who==whom){
    return res.status(401).json({
      status: "Failed",
      message: "You can't follow yourself"
    });
  }
  fl.findOne({
    where: {
        who:who,
        whom:whom
    }
  }).then(doc=>{
    if(doc!=null){
      return res.status(409).json({
        status: "Failed",
        message: "Already following",
        doc
      });
    } else{
      fl.create({
        who:who,
        whom: whom
      }).then(result => {
        res.status(200).json({
          status: "Success",
          message:"Followed",
          result,
          userData: req.userData
        })
      })
    }
  }).catch(function (err) {
    return res.status(500).json({
        error: err
    });
  })
})


router.delete("/follow/:ID", auth, (req, res, next)=>{
  var who = req.userData.id;
  var whom = req.params.ID;
  
  if (who==whom){
    return res.status(401).json({
      status: "Failed",
      message: "You can't unfollow yourself"
    });
  }
  fl.destroy({
    where: {
        who:who,
        whom:whom
    }
  }).then(doc=>{
    if(doc == 1){
     return res.status(200).json({
        status:"Success",
        message: "Unfollowed Successfully"
      });
    }
    return res.status(409).json({
      status:"Failed",
      message: "Not Following the user"
    })
  }).catch(function (err) {
    return res.status(500).json({
        error: err
    });
})


})


module.exports = router;