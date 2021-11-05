var express = require('express');
const session = require('express-session');
var router = express.Router();
//Routing with donnes en dure--------------------------------
var crtldonnes = require('../controllers/donneesControllers')


/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', { title: 'Express' });
});

//Connection with our formulaire------------------------------
router.get('/formulaire', (req, res) =>{
  res.render('formulaire');
});

//Connection with our bdd------------------------------------- 
router.post('/donnees', crtldonnes.data);




module.exports = router;
