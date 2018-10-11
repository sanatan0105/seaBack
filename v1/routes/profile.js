const express = require("express");
const router = express.Router();
const User = require('../../db/models').user;
const Blog = require('../../db/models').blog;
const Visit = require('../../db/models').visit;
const Like = require('../../db/models').like;
const Count = require('../../db/models').count;
const fl = require('../../db/models').fl;
const { check, validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');
const auth = require('../middleware/check_auth');
var ProfileFollow = require('../helper/profileFollow')
const InsetView = require('../helper/viewInsert');
const Sequelize = require('sequelize')
router.get("/user/:ID", (req, res, next)=>{
  user_id = req.params.ID;
  User.findAll({ 
    attributes: ['id', 'name', 'created_at'],
    where: { 
      id: user_id, 
    } 
    
  }).then(doc=>{
    res.status(200).json({
      doc
    });
  }).catch(function (err) {
    return res.status(500).json({
        error: err
    });
  })
})
//ID is followed by all the listed users
router.get("/follower/:ID", (req, res, next)=>{
  user_id = req.params.ID;

  var sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
    host: 'localhost',
    dialect: 'mysql',
  });
  sequelize.query(
    ' select name, id from user where id in (select who from fl where whom =:user)',
    {
      replacements: { 
        user: user_id 
      }, 
      type: sequelize.QueryTypes.SELECT 
    }).then(doc => {
      res.status(200).json({
        doc
      })
    })


  // fl.findAll({ 
    
  //   where: { 
  //     whom: user_id, 
  //   } 
    
  // }).then(doc=>{
  //   console.log(doc.length);
    
    
  //   res.status(200).json({
  //     doc
  //   });
  // }).catch(function (err) {
  //   return res.status(500).json({
  //       error: err
  //   });
  // })
})


//ID is following all the listed users
router.get("/following/:ID", (req, res, next)=>{
  user_id = req.params.ID;
  fl.findAll({ 
    include: 
    [
      {
        model: User,
        attributes: ['id', 'name', 'created_at'],
      }
    ],
    where: { 
      who: user_id, 
    } 
    
  }).then(doc=>{
    res.status(200).json({
      doc
    });
  }).catch(function (err) {
    return res.status(500).json({
        error: err
    });
  })
})
router.get("/user-liked/:ID", (req, res, next)=>{
  user_id = req.params.ID;
  Like.findAll({ 
    include:
    [
      {
        model: Blog,
        include:[ 
          { 
              model: User, 
          },
          { 
              model: Count,
          },
          { 
              model: Like,
              include: [ {
                  model: User
              }]
          },
           
      ],
      }
      
    ],
    where: { 
      uid: user_id, 
    } 
  }).then(doc=>{
    res.status(200).json({
      doc
    });
  }).catch(function (err) {
    return res.status(500).json({
        error: err
    });
  })
})
router.get("/user-and-blog/:ID", (req, res, next)=>{
  user_id = req.params.ID;
  User.findOne({ 
    attributes: ['id', 'name', 'created_at'],
    include:
    [ 
      { 
        model: Blog,
        attributes: ['id', 'blog', 'create_at'],
        include:[ 
          { 
              model: User, 
          },
          { 
              model: Count,
          },
          { 
              model: Like,
              include: [ {
                  model: User
              }]
          },
           
      ],
      },

    ],
    where: { 
      id: user_id, 
    } 
  }).then(doc=>{
    res.status(200).json({
      doc
    });
  }).catch(function (err) {
    return res.status(500).json({
        error: err
    });
  })
})


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