//Declaration des variables
const formConnexion = document.getElementById('formConnexion');
const email = document.getElementById('email');
const password = document.getElementById('password');
var emailChecked = false;
var passwordChecked = false;


/* Evenement prennant place au moment au l'utilisateur appuie sur le button de submit */
formConnexion.addEventListener('submit', e => {
    checkInputs();
});

/**
 * Fonction permettant de verifier les valeurs entrees dans les champs et d'afficher des erreurs si besoin
 */
function checkInputs() {
    const emailValue = email.value.trim();
    const passwordValue = password.value.trim();

    //Vérification de l'email
    if (emailValue === '') {
        setErrorFor(email, 'L\'email ne peux pas être vide');
        //Cas ou email est vide

    } else if (!isEmail(emailValue)) {
        setErrorFor(email, 'E-mail est invalide');
        //Cas ou email ne match pas avec la regex

    } else {
        setSuccessFor(email);
        emailChecked = true;
        //Cas ou email est valide
    }

    //Vérification du mot de passe
    if (passwordValue === '') {
        setErrorFor(password, 'Le mot de passe ne peux pas être vide');
        //Cas ou mdp est vide

    } else if (!isPassword(passwordValue)){
        setErrorFor(password, 'Mot de passe invalide');
        //Cas ou mdp ne match pas avec la regex
    } else {
        setSuccessFor(password);
        passwordChecked = true;
        //Cas ou mdp est valide
    }

    //Si le mdp et l'email est valide alors on peut submit
    if (passwordChecked && emailChecked){
        return true;
        //On permet au formulaire de submit

    }else{
        return false;
        //On bloque le submit
    }
}
/**
 * Fonction permettant d'afficher un message d'erreur et un icone si les champs du formulaire sont incorrects
 * @param {} input
 * @param {} message
 */
function setErrorFor(input, message) {
    const formControl = input.parentElement;
    const small = formControl.querySelector('small');
    formControl.className = 'form-control error';
    small.innerText = message;
}
/**
 * Fonction permettant d'afficher un icone de validation si les champs du formulaire sont corrects
 * @param {} input
 * @param {} message
 */
function setSuccessFor(input) {
    const formControl = input.parentElement;
    formControl.className = 'form-control success';
}

/**
 * Fonction permettant de verifier un mot de passe en le comparant à une regex
 * @param {} password Le mot de passe à verifier
 */
function isPassword(password) {
    return /^(?=.*[A-Z])(?=.*[0-9])(?=.*[@$!%*?&])[A-Za-z0-9@$!%*?&]{8,20}$/.test(password);
}
/**
 * Fonction permettant de verifier l'email en la comparant a une regex
 * @param {} email L'email a verifier
 */
function isEmail(email) {
    return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
}