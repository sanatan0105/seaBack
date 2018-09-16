const express = require("express");
const router = express.Router();
const category = require('./db/models').category;
const sequelize = require('sequelize');


router.get("/", (req, res, next) => {
  

    category.findAll().then(result => {
        res.send(result);
        // console.log(result);
      });
    
      // console.log(process.env.NODE_ENV);
      // res.send("workign");
    
      // console.log(process.env.DB_HOST);
      // console.log(config.get('port').port);
      // console.log(config.get('ip'));
       
    
        // blog.create({
        //     blog: "हिन्दी"
        // }).then(result => {
        //     blog.findAll().then(result => {
        //         res.send(result);
        //         // console.log(result);
        //     });
        // });
    
        
    
    
        // category.create({
        //   category : "हिन्दी"
        // }).then(result => {
        //     console.log(result);
        //     res.send(result);
        // });
});

router.get("/login", (req, res, next) => {

      category.create({
        category : "हिन्दी"
      }).then(result => {
          console.log(result);
          res.send(result);
      });
});

module.exports = router;