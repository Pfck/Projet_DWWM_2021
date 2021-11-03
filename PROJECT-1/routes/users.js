var express = require('express');
const session = require('express-session');
const { render } = require('../app');
var router = express.Router();


/* GET users listing. */
router.get('/re', guide, function(req, res, next) {
  res.send(req.session.name);

});

function guide (req, res, next) {
  if (req.session.name ){
    next();
  } else {
    res.redirect('/formulaire');
  }
};



module.exports = router;
