 var bcrypt = require('bcrypt');
const saltRounds = 10;
var session = require('express-session');

function data(req, res)  {
    //ma const est en dure et remplace les donnees de la bdd -----------------------------
    const holis =
    {
        "name":"Paula", 
        "email":"paulagaubin@gmail.com",
        "mdp":"$2b$10$wBxhuAvMb9KiV8RuaVgMSezSvRsTRyP7DHyAUinfz5RTiB2k0Ve8K"
    };
    
    //bcrypt-----etape1hash---------------------------------------------------------------
    //console.log(bcrypt.hashSync(holis.mdp , saltRounds));

    //bcrypt-----etape2compare------------------------------------------------------------
    
    var comparaison = bcrypt.compareSync(req.body.mdp, holis.mdp);


    //cette if faisait la comparation entre notre data en dure et notre data de input
    if (req.body.email == holis.email && comparaison){
        session = req.session;
        session.name = holis.name;
        console.log(session);
        res.redirect("/users/re");

    }else{
        res.status(403).send("NOPE");
    }
    console.log('holis');
    //res.post('/donnees');
}









module.exports = {data};


