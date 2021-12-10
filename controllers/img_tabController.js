const Img_tab = require("../models/Img_tab");
const allowedExtension = ['.png','.jpg','.jpeg'];
var path = require('path');
const fs = require("fs");

/**
 * Controller du model Img_tab
 */
module.exports = class img_TabController {

    
    /* -------------------------------------------------------------
     *                            INDEX
     * -------------------------------------------------------------
     */

    /**
     * Get an array of data from the img_tab table of the database
     * and send it as data for the rendering of the template "index"
     * @param {*} req - The request from the internet browser
     * @param {*} res - The response from the server
     * @returns The rendering of the template called "Index" inside
     *  the users folder with an array of data from the table img_tab
     */

    static async index(req, res) {
        // Get the data array from the img_tab table of the database
        try {
            var sql_results = await Img_tab.getAll();
        } catch (error) {
            return res.render("error/500");
        }
        // rendering the "index" template with the array of data
        return res.render("images/index", { tb_img: sql_results });
    }// EO index



    /* -------------------------------------------------------------
     *                  CREATE (Template + Post)
     * -------------------------------------------------------------
     */


    /**
     * Render the form for a new img_tab
     * @param {*} req - The request from the internet browser
     * @param {*} res - The response from the server
     */
    static async new_img(req, res) {


        // If data are send as post in a boby (in a case of a return from the preview template)
        if (req.body.titre && req.body.description && req.body.img_url) {
            return res.render("images/new", { form_data: req.body});
        } // EO IF

        // render the "new" template inside the img_tab folder of views
        return res.render("images/new");
    } // EO new_img


    /**
     * Preview the new Content of the form data
     * @param {*} req - The request from the internet browser
     * @param {*} res - The response from the server
     */
    static async new_preview(req, res) {
        // Get the data from the request's body
        var body = req.body;
        // Get the file from the request
        var files = req.files;
        // If one field from these three is missing
        if ((!body.img_url && !files) || !body.description || !body.titre) {
            // Return Error code 422 with message
            return res.status(422).json({ error_code: 422, message: "Un Champ est vide" });
        } // EO IF

        if (files) {
            // Create upload path on the server
            var uploadPath = __dirname + '/../public/img/' + files.file.name;
            var imgPath = 'http://localhost:'+ process.env.PORT +'/img/' + files.file.name;
            // Place the file on the the images folder
            await files.file.mv(uploadPath, (err) => {
                if (err) {
                    console.log(err);
                    return res.redirect('error/500');
                } // EO IF
            });
            body.img_url = imgPath;

            console.log(body.img_url);
        } // EO IF

        // Get all img_tab
        var results = await Img_tab.getAll();
        // Render the preview template with the newdata and all other img
        return res.render("images/new_preview", {new_data: body, tb_img: results})
    } // EO new_preview

    /**
     * Create a new Img_tab object and try to insert
     * it into the img_tab table in the databse
     * @param {*} req - The request from the internet browser
     * @param {*} res - The response from the server
     * @returns
     * - On missing field(s) -> 422 Error code with message
     * - On succes -> True
     * - On Failure -> Exception.message
     */
    static async create(req, res) {
        // Declaring variable as the body of the request
        var body = req.body;
        var files = req.files;

        // If one field from these three is missing
        if ((!body.img_url && !files ) || !body.description || !body.titre) {
            // Return Error code 422 with message
            return res.status(422).json({ error_code: 422, message: "Un Champ est vide" });
        } // EO IF

        // If Both url and file are send
        if ((body.img_url && files) || files) {

            // Check the img file extension
            const extensionName = path.extname(files.file.name);
            
            // If the file extension is not allowed
            if (!allowedExtension.includes(extensionName)) {
                return res.status(422).json({error_code: 422, message: "Format de l'image invalide", supported_formats: ".png, .jpg, . jpeg"});
            } // EO IF

            // Create upload path on the server
            var uploadPath = __dirname + '/../public/img/' + files.file.name;
            var imgPath = 'http://localhost:' + process.env.PORT + '/img/' + files.file.name; // When prod, change the path.
            // Place the file on the the images folder
            await files.file.mv(uploadPath, (err) => {
                if (err) {
                    return res.redirect('error/500');
                } // EO IF
            });

            // Create new Img_tab object with the fields inside the request's body
            var new_img = new Img_tab(body.titre, imgPath, body.description); // Use the file path
        } else {

            // Create new Img_tab object with the fields inside the request's body
            var new_img = new Img_tab(body.titre, body.img_url, body.description); //use the link
            
        }// EO IF

        // Try to insert it into the databse
        try {
            var truc = new_img.insert();
        } catch (exception) {

            // If error, redirect to Internal Server Error Template
            return res.redirect("/error/500");
        } // EO Try/Catch block

        return res.redirect("/images/index")
    } // EO Create()



    /* -------------------------------------------------------------
     *                    Update (Template + Post)
     * -------------------------------------------------------------
     */


    /**
     * Send the data of the img_tab to the modification template
     * @param {*} req - The request from the internet browser
     * @param {*} res - The response from the server
     * @returns The Modification template with required data as a JSON array
     */
    static async edit(req, res) {

        var id = req.params.id;
        // If data are send as a body
        if (req.body.titre) {
            req.body.id = id;
            return res.render("images/update", {form_data: req.body});
        } // EO IF

        var results = await Img_tab.getOneById([id]);
        return res.render("images/update", {form_data: results[0]});
    } // EO Edits

    static async edit_preview(req, res) {
        var files = req.files
        var id = req.params.id;
        var req_body = req.body;
        req_body.id = id;

        if (req_body.img_url && files) {
            // Create upload path on the server
            var uploadPath = __dirname + '/../public/img/' + files.file.name;
            var imgPath = 'http://localhost:'+ process.env.PORT +'/img/' + files.file.name;
            // Place the file on the the images folder
            await files.file.mv(uploadPath, (err) => {
                if (err) {
                    console.log(err);
                    return res.redirect('error/500');
                } // EO IF
            });
            req_body.img_url = imgPath;
        } // EO IF


        var results = await Img_tab.getAllExceptOneId([id]);
        return res.render("images/update_preview", {new_data: req_body, tb_img: results});
    
    }
    
    /**
     * Get the updated data from a html form and update the img_tab entry with these data
     * @param {*} req - The request from the internet browser
     * @param {*} res - The response from the server
     * @returns 
     * - On Succes: Redirect to the index template
     * - On Request Failure: Redirect to the Error 500 Template
     * - If the img_url is already used: res.send(message)
     */
    static async update(req, res) {
        // We store the parameter of the request
        var id = req.params.id;
        // We store the body of the request
        var body = req.body;

        var files = req.files;


        // Query to the database and select one img_tab by an id
        try {
            var sql_results = await Img_tab.getOneByLink(body.img_url);

        // If error redirect to the Error 500 Template
        } catch (error) {
            return res.redirect("/error/500");
        } // EO try/catch

        // If the request return a result not empty 
        // and if the id of the request is not the same as the query parameter id
        if (sql_results.length == 1 && sql_results[0].id != id) {
            // Voir avec Eric pour ce qu'il avait fait la semaine dernière
            return res.send("Le lien est déjà utilisé");
        } // EO IF

        // If Both url and file are send
        if (files) {

            // Check the img file extension
            const extensionName = path.extname(files.file.name);
            console.log(extensionName);
            console.log(!allowedExtension.includes(extensionName));
            // If the file extension is not allowed
            if (!allowedExtension.includes(extensionName)) {
                return res.status(422).json({error_code: 422, message: "Format de l'image invalide", supported_formats: ".png, .jpg, . jpeg"});
            } // EO IF

            // Create upload path on the server
            var uploadPath = __dirname + '/../public/img/' + files.file.name;
            var imgPath = 'http://localhost:' + process.env.PORT + '/img/' + files.file.name; // When prod, change the path.
            // Place the file on the the images folder
            await files.file.mv(uploadPath, (err) => {
                if (err) {
                    return res.redirect('error/500');
                } // EO IF
            });

            // Try to update the database
            try {
                Img_tab.updateOneById([body.titre, imgPath, body.description, parseInt(id)]);
    
                // If it catch Errors
            } catch (error) {
                console.log(error);
                return false;
            } // EO Try/Catch

        } else {

            // Try to update the database
        try {
            Img_tab.updateOneById([body.titre, body.img_url, body.description, parseInt(id)]);

            // If it catch Errors
        } catch (error) {
            console.log(error);
            return false;
        } // EO Try/Catch
            
        }// EO IF

        

        // Redirection to the index template
        return res.redirect('/images/index');
    } // EO Update


    /* -------------------------------------------------------------
     *                    Delete (Template + Post)
     * -------------------------------------------------------------
     */

    /**
     * Render the delete confirmation template
     * @param {*} req - The request from the internet browser
     * @param {*} res - The response from the server
     */
    static async suppression(req, res) {
        // Storing the id value of the request paramater
        var id = req.params.id;
        var sql_result = await Img_tab.getOneById([id]);
        // Rendering the delete confirmation template with required data
        return res.render("images/suppression.ejs", { tb_img: sql_result[0] });
    } // EO Suppression

    /**
     * Delete the given Img_tab by an Id
     * @param {*} req - The request from the internet browser
     * @param {*} res - The response from the server
     * @returns 
     * - On Succes: Redirect to the index Template
     * - On Failure: False
     */
    static async delete(req, res) {
        // Storing the id value of the request paramater
        var id = req.params.id;

        var img = await Img_tab.getOneById([id]);

        if (img[0].img_url.includes("http://localhost:" + process.env.PORT)) {
            let stringPath = "http://localhost:" + process.env.PORT + "/img/"
            let strSize = stringPath.length;
            let fileName = img[0].img_url.substring(strSize-1);
            let filePath = __dirname + '/../public/img/' + fileName;
            fs.unlink(filePath, (err) => {
                if (err) return res.redirect('error/500');
            });
        }

        // Try to delete the img_tab
        try {
            Img_tab.deleteById([id]);
        } catch (error) {
            console.log(error);
            res.redirect("/error/500");
        }
        // Redirect to the index template
        return res.redirect('/images/index');
    } // EO Delete

}// EO img_tabController
