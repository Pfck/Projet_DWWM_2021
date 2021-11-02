

function data(req, res)  {
    //ma const est en dure et remplace les donnees de la bdd -----------------------------
    const holis ={"email":"paulgaubin@hotmail.com","mdp":"holisCocoperdoname"};
    
    //cette if faisait la comparation entre notre data en dure et notre data de input
    if (req.body.email == holis.email && req.body.mdp == holis.mdp ){
        res.json(true);
    }else{
        res.json(false);
    }
    console.log('holis');
    //res.post('/donnees');
}

module.exports = {data};