const express = require("express");
const router = express.Router();



// include routers
const loginRegister = require('./v1/routes/login-register');
const feed = require('./v1/routes/feed')
const feedAction = require('./v1/routes/feedAction')
router.use('/loginRegister', loginRegister);
router.use('/feed', feed);
router.use('/feedAction', feedAction);

//like post route
// router.get("/like/:ID", auth, LikeAction, (req, res, next) => {} )

module.exports = router;
