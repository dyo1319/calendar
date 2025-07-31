const port = 8888;
const express = require('express');
const app = express();
app.use(express.json());


const bodyParser = require('body-parser');
const path = require("path");
app.use(bodyParser.urlencoded({extended: false}));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname,"./views"));

let db_M = require('./database');
global.db_pool = db_M.pool;

global.addSlashes   = require('slashes').addSlashes;
global.stripSlashes = require('slashes').stripSlashes;


const crs_R = require('./routers/course_R');
app.use('/crs',crs_R);

const usr_R = require('./routers/users_R');
app.use('/u',usr_R);

app.get('/', (req, res) => {
    res.render("index", {});
})


app.listen(port, () => {
    console.log(`Now listening on port http://localhost:${port}`);
});