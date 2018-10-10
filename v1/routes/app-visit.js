const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const User = require('../../db/models').user;
const AppVisit = require('../../db/models').app_visit;
const Blog = require('../../db/models').blog;
const { check, validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');
const auth = require('../middleware/check_auth');
const LikeAction = require("../helper/like");
const InsetView = require('../helper/viewInsert');



router.post("/", (req, res, next) => {
    var token = req.body.token;
    const status = req.body.status;
    if(status == 0){
        AppVisit.create({
            token: token,
            status: status
        }).then(doc => {
            return res.status(200).json({
                status: "Success",
                message: "Inserted",
            })
        }) 
        .catch(function (err) {
            return res.status(500).json({
                error: err
            });
        })
    } else {
        const authorizationtoken = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(authorizationtoken, process.env.JWT_KEY);
        req.userData = decoded;

        token = req.userData.id;
        
        AppVisit.create({
            token: token,
            status: status
        }).then(doc => {
            return res.status(200).json({
                status: "Success",
                message: "Inserted",
                
            })
        }) 
        .catch(function (err) {
            return res.status(500).json({
                error: err
            });
        })
    }
});
module.exports = router;
// module.exports = {
//     insertView(doc, UserId){
//         for (var i in doc){
//             val = doc[i];
//             Visit.create({
//                 bid:val.dataValues.id,
//                 uid: UserId
//             })
//             Count.update({ 
//                 count: Sequelize.literal('count + 1')
//             }, 
//             { 
//                 where: { 
//                     id: val.dataValues.id 
//                 } 
//             });
//         } 
//     }
// };