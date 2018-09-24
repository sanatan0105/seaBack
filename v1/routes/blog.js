const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const User = require('../../db/models').user;
const Blog = require('../../db/models').blog;
const Like = require('../../db/models').like;
const { check, validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');
const auth = require('../middleware/check_auth');
const LikeAction = require("../helper/like");
const InsetView = require('../helper/viewInsert');

router.post("/like/:ID", auth, LikeAction, (req, res, next)=>{})

module.exports = router;