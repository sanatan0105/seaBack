const express = require("express");
const router = express.Router();
const User = require('../../db/models').user;
const Blog = require('../../db/models').blog;
const Visit = require('../../db/models').visit;
const Like = require('../../db/models').like;
const Count = require('../../db/models').count;
const Category = require('../../db/models').category;
const fl = require('../../db/models').fl;
const { check, validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');
const auth = require('../middleware/check_auth');
var ProfileFollow = require('../helper/profileFollow')
const InsetView = require('../helper/viewInsert');
const jwt = require('jsonwebtoken');

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


router.post("/", auth, [
        check('category').not().isEmpty().trim().escape(),
        check('blog').not().isEmpty().trim().escape(),
    ],  (req, res, next)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty){
        console.log(errors);
        return res.status(422).json({ errors: errors.array() });
    }
    const userId = req.userData.id;
    const category = req.body.category;
    const blog = req.body.blog;

    Blog.create({
        user_id: userId,
        blog: blog,
        category_id: category
    })
    .then(result => {
        console.log(result.dataValues.id);

        Count.create({
            bid: result.dataValues.id,
            count: 1
        }).then(doc=>{
            return res.status(200).json({
                status: "Success",
                message: "Blog created",
                body: result
            })
        })
    }) 
    .catch(function (err) {
        return res.status(500).json({
            error: err
        });
    })
})
module.exports = router;