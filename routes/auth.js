var express = require('express');
var router = express.Router();
var auth = require('../controllers/Authentication_Controller')
var auth_check = auth.check;

router.post("/login", auth.login); // Login Route
router.get("/logout", auth_check, auth.logout); // Logout Route

module.exports = router;