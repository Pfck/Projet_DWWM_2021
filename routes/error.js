var express = require('express');
const { error500, error404 } = require('../controllers/error/error_controller');
var router = express.Router();

router.get('/500', error500);
router.get('/404', error404);


module.exports = router;