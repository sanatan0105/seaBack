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

const InsetView = require('../helper/viewInsert');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

router.get("/shyari-by-id/:ID", (req, res, next) => {
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
router.get("/shyari", (req, res, next) => {

    Blog.findAll({ 
        distinct: true,
        order: [ [ 'id', 'ASC' ] ],
        limit: 200,
        offset: 0,
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


router.get("/shyari-by-cat/:ID", (req, res, next) => {
    const catId = req.params.ID; 
    Blog.findAll({ 
        where: {
            category_id: catId
        },
        distinct: true,
        order: [ [ 'id', 'ASC' ] ],
        limit: 200,
        offset: 0,
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
    })
        
})


router.post("/liveSearchShyari", (req, res, next) => {
    const query = req.body.query; 
    Blog.findAll({ 
        where: {
            blog: {
                [Op.like]: '%'+query+'%'
            }
        },
        distinct: true,
        order: [ [ 'id', 'ASC' ] ],
        limit: 200,
        offset: 0,
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
        order: [ [ 'id', 'ASC' ] ],
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
        order: [ [ 'id', 'ASC' ] ],
        limit: 200,
        offset: 0,
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
    })
        
})


module.exports = router;