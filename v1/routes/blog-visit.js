const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const User = require('../../db/models').user;
const Blog = require('../../db/models').blog;
const Visit = require('../../db/models').visit;
const Count = require('../../db/models').count;

const { check, validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');
const auth = require('../middleware/check_auth');
const LikeAction = require("../helper/like");
const InsetView = require('../helper/viewInsert');
const Sequelize = require('sequelize')



router.post("/", (req, res, next) => {
    var token = req.body.token;
    var status = req.body.status;
    var blogId = req.body.blogId;
    if(status == 0){
        uid = token
    } else {
        const authorizationtoken = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(authorizationtoken, process.env.JWT_KEY);
        req.userData = decoded;
        uid = req.userData.id;
    }
    
    Visit.create({
        bid: blogId,
        uid: uid,
        status: status,
    }).then(doc=>{
        Count.update({ count: Sequelize.literal('count + 1') }, { where: { bid: blogId }})
    });
});
module.exports = router;