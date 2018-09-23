const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const User = require('../../db/models').user;
const Blog = require('../../db/models').blog;
const { check, validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');
const auth = require('../middleware/check_auth');
const LikeAction = require("../helper/like");
const InsetView = require('../helper/viewInsert');

router.get("/", auth, (req, res, next) => {
    userData = req.userData;
    user_id = userData.id;
    Blog.findAll().then(doc => {
        // console.log(doc);
        InsetView.insertView(doc, user_id);
        res.status(200).json({
            doc: doc

        })
    })
    
});


module.exports = router;