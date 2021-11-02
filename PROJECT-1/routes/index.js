var express = require('express');
var router = express.Router();
var crtldonnes = require('../controllers/donneesControllers')


/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', { title: 'Express' });
});


router.get('/formulaire', (req, res) =>{
  res.render('formulaire');
});

router.post('/donnees',crtldonnes.data);

module.exports = router;
