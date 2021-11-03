var express = require('express');
var router = express.Router();
var crtldonnes = require('../controllers/donneesControllers')


/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', { title: 'Express' });
});

//Connection with our formulaire
router.get('/formulaire', (req, res) =>{
  res.render('formulaire');
});

//Connection with our bdd 
router.post('/donnees', crtldonnes.data);

module.exports = router;
