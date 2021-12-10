//Declarations des variables
var modal = document.querySelectorAll(".modal");
var buttonSignUp = document.querySelectorAll('.buttonSignUp');
var header = document.querySelector('#header');
var passwordType = document.getElementById('password');
var body = document.getElementById('body');

/*--------------------------------Fonctions affichage Popups---------------------------------------*/

/**
 * Fonction permettant d'afficher ou non une popup et désactive le button d'affichage
 * @param {int} modalId Optionnel
 */
function switching (modalId = 0){
    modal[modalId].classList.toggle('none');
    if (!modal[modalId].classList.contains('none')){
        buttonSignUp[0].style.cursor ='default';
        buttonSignUp[0].disabled = true;
        //On desactive le button de connexion
    }else{
        buttonSignUp[0].style.cursor ='pointer';
        buttonSignUp[0].disabled = false;
        //On reactive le button de connexion
    }
}

/*--------------------------------Popup Connexion---------------------------------------*/

buttonSignUp[0].addEventListener('click', function(){
    switching(0);
});
/*Evenement correspondant au buttonSignUp de Connexion
buttonSignUp[0] corresponds au button Connexion*/

buttonSignUp[1].addEventListener('click', function(){
    switching(0);
});
/*Même evenement que pour le buttonSignUp de connexion sur le buttonSignUp
de fermeture de la popup
buttonSignUp corresponds a la croix de fermeture*/

buttonSignUp[2].addEventListener('click', function(){
    buttonSignUp[2].style.visibility = "hidden";
    buttonSignUp[3].style.visibility = "visible";
    passwordType.type = 'password';
});
/*buttonSignUp[2] corresponds a l'icone oeil ferme */

buttonSignUp[3].addEventListener('click', function(){
    buttonSignUp[3].style.visibility = "hidden";
    buttonSignUp[2].style.visibility = "visible";
    passwordType.type = 'text';
});
/*buttonSignUp[3] corresponds a l'icone oeil ouvert*/
/*Evenements permettant d'afficher ou non le mot de passe*/


