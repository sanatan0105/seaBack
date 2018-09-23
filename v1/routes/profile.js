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


module.exports = router;