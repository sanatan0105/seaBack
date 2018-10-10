const express = require("express");
const router = express.Router();
const User = require('../../db/models').user;
const Blog = require('../../db/models').blog;
const Visit = require('../../db/models').visit;
const Like = require('../../db/models').like;
const Category = require('../../db/models').category;
const Version = require('../../db/models').app_version;
const fl = require('../../db/models').fl;
const { check, validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');
const auth = require('../middleware/check_auth');
var ProfileFollow = require('../helper/profileFollow')
const InsetView = require('../helper/viewInsert');


router.get("/", (req, res, next) => {
    Version.findOne({ 
        order: [ [ 'id', 'Desc' ] ],
    }).then(doc => {
        res.status(200).json({
            doc
        });
    })
})


module.exports = router;