const express = require("express");
const router = express.Router();



// include routers
const loginRegister = require('./v1/routes/login-register');
const feed = require('./v1/routes/feed')
const feedAction = require('./v1/routes/feedAction')
const profile = require('./v1/routes/profile')
const blog = require('./v1/routes/blog')
const create = require('./v1/routes/create')
const search = require('./v1/routes/search')



router.use('/loginRegister', loginRegister);
router.use('/feed', feed);
router.use('/profile', profile);
router.use('/feedAction', feedAction);
router.use('/blog', blog);
router.use('/create', create);
router.use('/search', search);

//like post route
// router.get("/like/:ID", auth, LikeAction, (req, res, next) => {} )

module.exports = router;
