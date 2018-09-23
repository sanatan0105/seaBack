const express = require("express");

const User = require('../../db/models').user;
const Blog = require('../../db/models').blog;
const Sequelize = require('sequelize');
const Count = require('../../db/models').count;
const Category = require('../../db/models').category;
const Visit = require('../../db/models').visit;
const Like = require('../../db/models').like;
module.exports = (req, res, next) => {
    userid = req.userData.id;
    blogId = req.params.ID
    Like.findOrCreate({
        where: {
            uid: userid,
            bid: blogId,
        }
    })
    .spread((doc, created) => {
      if(created){
        var dataValues = doc.dataValues
        return res.status(200).json({
            status: "success",
            message: "Liked",
            blogId: req.params.ID,
            userData: req.userData,
            dataValues
        })
      }else{
        return res.status(500).json({
            Status:"Failed",
            message: "Already liked the post",
            blogId: req.params.ID,
            userData: req.userData,
        });
      }
    })
    .catch(function (err) {
        return res.status(500).json({
            Status:"Failed",
            message: "Something went wring",
            error: err
        });
    })
      /*
       findOrCreate returns an array containing the object that was found or created and a boolean that will be true if a new object was created and false if not, like so:
  
      [ {
          username: 'sdepold',
          job: 'Technical Lead JavaScript',
          id: 1,
          createdAt: Fri Mar 22 2013 21: 28: 34 GMT + 0100(CET),
          updatedAt: Fri Mar 22 2013 21: 28: 34 GMT + 0100(CET)
        },
        true ]
  
   In the example above, the "spread" on line 39 divides the array into its 2 parts and passes them as arguments to the callback function defined beginning at line 39, which treats them as "user" and "created" in this case. (So "user" will be the object from index 0 of the returned array and "created" will equal "true".)
      */
    next();
};