const express = require("express");
const router = express.Router();
const CSRF = require('./v1/middleware/header-auth')



// include routers
const loginRegister = require('./v1/routes/login-register');
const feed = require('./v1/routes/feed')
const feedAction = require('./v1/routes/feedAction')
const profile = require('./v1/routes/profile')
const blog = require('./v1/routes/blog')
const create = require('./v1/routes/create')
const search = require('./v1/routes/search')
const ver = require('./v1/routes/version')
const appVisit = require('./v1/routes/app-visit')
const blogVisit = require('./v1/routes/blog-visit')

router.use('/loginRegister', loginRegister);
router.use('/feed', feed);
router.use('/profile', CSRF, profile);
router.use('/feedAction', feedAction);
router.use('/blog', blog);
router.use('/create', create);
router.use('/search', search);
router.use('/version', ver);
router.use('/appVisit', appVisit);
router.use('/blogVisit', blogVisit);

//like post route
// router.get("/like/:ID", auth, LikeAction, (req, res, next) => {} )

module.exports = router;
