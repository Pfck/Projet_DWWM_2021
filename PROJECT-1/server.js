const createError = require('http-errors');
const express = require('express');
const path = require('path');
const bodyparser = require('body-parser');
const cors = require('cors');
//const formulaire = require('./views/formulaire'); 


const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


app.use(express.json());
 
app.use(bodyparser.json());
 
app.use(bodyparser.urlencoded({
    extended: true
}));
 
app.use(cors());
 
app.use('/', (req, res) =>{

  res.render('formulaire');
} );
 
// Handling Errors
app.use((err, req, res, next) => {
    // console.log(err);
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal Server Error";
    res.status(err.statusCode).json({
      message: err.message,
    });
});
 
app.listen(3000,() => console.log('Server is running on port 3000'));