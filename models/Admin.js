var db_Controller = require('../controllers/db_Controller');

class Admin {

    /**
     * Constructor of the Admin Model Class
     * @param {*} mail - Email of the Admin
     * @param {*} pswd - Password of the admin
     */

    constructor(id, mail, pswd) {
        this.mail = mail,
        this.pswd = pswd
    }

    /**
     * Fonction permettant de récupérer les admins
     */
    static getAll() {
        const sql_string = "SELECT * FROM admin";
        return db_Controller.sql(sql_string);
        
    } // EO getAll

    /**
     * Fonction permettant de retourner un admins par son mail
     * @param {any[]} argTab - Email of the admin in an array.
     */
    static getOneByMail(argTab) {
        const sql_string = "SELECT * FROM admin where mail = ?";
        try {
            return db_Controller.sql(sql_string, argTab);
        } catch (error) {
            throw error;
        }
    } // EO getOneByMail




} // EO Class admin

module.exports = Admin;