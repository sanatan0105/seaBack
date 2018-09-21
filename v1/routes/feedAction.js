const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const User = require('../../db/models').user;
const Blog = require('../../db/models').blog;
const { check, validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');
const auth = require('../middleware/check_auth');

router.post("/", auth, check('blog').not().isEmpty().trim().escape(),(req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    } 
    userData = req.userData;
    user_id = userData.id;
    blog = req.body.blog;
    category = req.body.category;
    Blog.create({
        user_id: user_id,
        blog: blog,
        category: category
    }).then(doc=>{
        console.log(doc)
        res.status(200).json({
            doc,
            userData
        });
    })
});

router.get("/:blogId", auth, (req, res, next) =>{
    const blogId = req.params.blogId;
    Blog.destroy({
        where:{
            id: blogId
        }
    }).then(doc=>{
        console.log("Blog Deleted");
        res.status(200).json({
            status: "Success",
            message: "Deleted Successfully",
            doc
        });
    })
})

router.patch("/:blogId", auth, (req, res, next) =>{
    const blogId = req.params.blogId;
    Blog.destroy({
        where:{
            id: blogId
        }
    }).then(doc=>{
        console.log("Blog Deleted");
        res.status(200).json({
            status: "Success",
            message: "Deleted Successfully",
            doc
        });
    })
})


router.delete("/:blogId", auth, (req, res, next) =>{
    const blogId = req.params.blogId;
    Blog.destroy({
        where:{
            id: blogId
        }
    }).then(doc=>{
        console.log("Blog Deleted");
        res.status(200).json({
            status: "Success",
            message: "Deleted Successfully",
            doc
        });
    })
})
module.exports = router;