const express = require("express");
const router = express.Router();
const User = require('../../db/models').user;
const Blog = require('../../db/models').blog;
const Visit = require('../../db/models').visit;
const Count = require('../../db/models').count;
const Like = require('../../db/models').like;
const Category = require('../../db/models').category;
const fl = require('../../db/models').fl;
const { check, validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');
const auth = require('../middleware/check_auth');
var ProfileFollow = require('../helper/profileFollow')
const jwt = require('jsonwebtoken');
const InsetView = require('../helper/viewInsert');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

router.get("/shyari-by-id/:ID/:TOKEN/:STATUS", (req, res, next) => {
    const blogid = req.params.ID; 
    Blog.findOne({ 
        where: {
            id: blogid
        },
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
    }).then(doc=>{
        res.status(200).json({
            doc
        });
        var token =req.params.TOKEN;
        var status =parseInt(req.params.STATUS);

        if(status == 0){
            uid = token
        } else {
            
            const decoded = jwt.verify(token, process.env.JWT_KEY);
            req.userData = decoded;
            uid = req.userData.id;
        }

        var blogId = doc.dataValues.id;
        Visit.create({
            bid: blogId,
            uid: uid,
            status: status,
        }).then(doc=>{
            Count.update({ count: Sequelize.literal('count + 1') }, { where: { bid: blogId }})
        });
    
    })
        
})

router.get("/category", (req, res, next) => {
   

    Category.findAll({ 
        distinct: true,
        
        order: [ [ 'category', 'ASC' ] ],
    }).then(doc => {
        res.status(200).json({
            doc
        });
    })
})
router.get("/shyari/:LIMIT/:OFFSET/:TOKEN/:STATUS", (req, res, next) => {
    var limit =parseInt(req.params.LIMIT);
    

    // var offset =parseInt(req.params.OFFSET)*limit; 
    var offset =parseInt(req.params.OFFSET); 
    if (isNaN(limit)) {
        limit = 50;
    }
    if(isNaN(offset)) {
        offset = 1;
    }
     
    offset =offset*limit; 

    Blog.findAll({ 
        distinct: true,
        limit: limit,
        offset: offset,
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
    
    }).then(doc=>{
        res.status(200).json({
            doc
        });


        var token =req.params.TOKEN;
        var status =parseInt(req.params.STATUS);
        if(status == 0){
            uid = token
        } else {
            
            const decoded = jwt.verify(token, process.env.JWT_KEY);
            req.userData = decoded;
            uid = req.userData.id;
        }
        
        for(var i=0; i<doc.length; i++){
            const blog = doc[i]
            const blogId = blog.id;
            Visit.create({
                bid: blogId,
                uid: uid,
                status: status,
            }).then(doc=>{
                Count.update({ count: Sequelize.literal('count + 1') }, { where: { bid: blogId }})
            });
        }
    })
        
})

router.get("/get-category/:ID", (req, res, next) => {
    const catId = req.params.ID; 
    Category.findAll({ 
        where: {
            id: catId
        },
    }).then(doc=>{
        res.status(200).json({
            doc
        });
    }) 
})


router.get("/shyari-by-cat/:ID/:limit/:offsest/:token/:status", (req, res, next) => {
    const catId = req.params.ID; 
    const limit = parseInt(req.params.limit);
    const offsest = parseInt(req.params.offsest);
  
    Blog.findAll({ 
        where: {
            category_id: catId
        },
        distinct: true,
       
        limit: limit,
        offset: offsest,
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
    }).then(doc=>{
        res.status(200).json({
            doc
        });

        var token =req.params.token;
        var status =parseInt(req.params.status);
        if(status == 0){
            uid = token
        } else {
            const decoded = jwt.verify(token, process.env.JWT_KEY);
            req.userData = decoded;
            uid = req.userData.id;
        }
        
        for(var i=0; i<doc.length; i++){
            const blog = doc[i]
            const blogId = blog.id;
            Visit.create({
                bid: blogId,
                uid: uid,
                status: status,
            }).then(doc=>{
                Count.update({ count: Sequelize.literal('count + 1') }, { where: { bid: blogId }})
            });
        }


    })
        
})


router.post("/liveSearchShyari", (req, res, next) => {
    const query = req.body.query; 
    const offset = parseInt(req.body.offset); 
    const limit = parseInt(req.body.limit); 
    Blog.findAll({ 
        where: {
            blog: {
                [Op.like]: '%'+query+'%'
            }
        },
        distinct: true,
        
        limit: limit,
        offset: offset,
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
    }).then(doc=>{
        res.status(200).json({
            doc
        });

        var token =req.body.token;
        
        var status =parseInt(req.body.status);
        if(status == 0){
            uid = token
        } else {
            const decoded = jwt.verify(token, process.env.JWT_KEY);
            req.userData = decoded;
            uid = req.userData.id;
        }
        
        for(var i=0; i<doc.length; i++){
            const blog = doc[i]
            const blogId = blog.id;
            Visit.create({
                bid: blogId,
                uid: uid,
                status: status,
            }).then(doc=>{
                Count.update({ count: Sequelize.literal('count + 1') }, { where: { bid: blogId }})
            });
        }
    })
        
})


router.post("/liveSearchCategory", (req, res, next) => {
    const query = req.body.query; 
    Category.findAll({ 
        where: {
            category: {
                [Op.like]: '%'+query+'%'
            }
        },
        distinct: true,
        
        limit: 200,
        offset: 0,
    }).then(doc=>{
        res.status(200).json({
            doc
        });
    })
        
})


router.post("/shyari-live-search", (req, res, next) => {
    const catId = req.body.catId; 
    const query = req.body.query; 
    const limit =parseInt(req.body.limit); 
    const offset = parseInt(req.body.offset); 
    Blog.findAll({ 
        where: {
            [Op.and]: [
                {
                    category_id: catId
                },
                {
                    blog: {
                        [Op.like]: '%'+query+'%'
                      }
                }
            ]
            
        },
        distinct: true,
        limit: limit,
        offset: offset*limit,
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
    }).then(doc=>{
        res.status(200).json({
            doc
        });


        var token =req.body.token;
        
        var status =parseInt(req.body.status);
        if(status == 0){
            uid = token
        } else {
            const decoded = jwt.verify(token, process.env.JWT_KEY);
            req.userData = decoded;
            uid = req.userData.id;
        }
        
        for(var i=0; i<doc.length; i++){
            const blog = doc[i]
            const blogId = blog.id;
            Visit.create({
                bid: blogId,
                uid: uid,
                status: status,
            }).then(doc=>{
                Count.update({ count: Sequelize.literal('count + 1') }, { where: { bid: blogId }})
            });
        }



    })
        
})


router.get("/user/:offset/:limit", (req, res, next) => {
    var offset = parseInt(req.params.offset);
    var limit = parseInt(req.params.limit);
    
    User.findAll({ 
        limit: limit,
        offset: offset*limit,
        attributes: ['id', 'name','username', 'created_at'],
      }).then(doc=>{
        res.status(200).json({
          doc
        });
      }).catch(function (err) {
        return res.status(500).json({
            error: err
        });
      })
});

router.get("/user/:offset/:limit/:query", (req, res, next) => {
    var offset = parseInt(req.params.offset);
    var limit = parseInt(req.params.limit);
    var query = req.params.query;
    
    User.findAll({ 
        limit: limit,
        offset: offset*limit,
        where: {
            name: {
                [Op.like]: '%'+query+'%'
            }
        },
        distinct: true,
        attributes: ['id', 'name','username', 'created_at'],
      }).then(doc=>{
        res.status(200).json({
          doc
        });
      }).catch(function (err) {
        return res.status(500).json({
            error: err
        });
      })
});

module.exports = router;