const port = 8888;
const express = require('express');
const app = express();
app.use(express.json());


const bodyParser = require('body-parser');
const path = require("path");
app.use(bodyParser.urlencoded({extended: false}));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname,"./views"));

global.addSlashes   = require('slashes').addSlashes;
global.stripSlashes = require('slashes').stripSlashes;


app.get('/', (req, res) => {
    res.render("index", {});
})


app.listen(port, () => {
    console.log(`Now listening on port http://localhost:${port}`);
});