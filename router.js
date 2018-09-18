const express = require("express");
const router = express.Router();



// include routers
const loginRegister = require('./v1/routes/login-register');

router.use('/loginRegister', loginRegister);

module.exports = router;