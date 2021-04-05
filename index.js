require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT || 80;

app.use(express.static(__dirname + "/public"))

app.get('/', (req, res) => {
    res.sendFile(`${__dirname}/public/index.html`)
})

app.listen(port, err => {
    if(err) console.error(err);
    else console.log(`Server started and runing on port ${port}`);
});