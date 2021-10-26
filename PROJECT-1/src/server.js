require('dotenv').config();
const app = require('../app');

const PORT = process.env.PORT;

app.listen(PORT, (err) => {
    if(err) {
        console.log(err);
    } else {
        console.log(`Server is running on ${PORT}`);
    }
});

module.exports = app;