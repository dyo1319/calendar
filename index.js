const port = 8888;
const express = require('express');
const app = express();
app.use(express.json());


const bodyParser = require('body-parser');
const path = require("path");
app.use(bodyParser.urlencoded({extended: false}));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname,"./views"));

var cookieParser = require('cookie-parser');
app.use(cookieParser());
global.Jwt = require('jsonwebtoken');


let db_M = require('./database');
global.db_pool = db_M.pool;

global.addSlashes   = require('slashes').addSlashes;
global.stripSlashes = require('slashes').stripSlashes;

global.was_logged = false;
const user_Mid = require('./middleware/user_Mid');



const crs_R = require('./routers/course_R');
app.use('/crs',[user_Mid.isLogged],crs_R);
const usr_R = require('./routers/users_R');
app.use('/u',[user_Mid.isLogged],usr_R);
const auth_R = require('./routers/auth_R');
app.use('/',auth_R);


app.get('/', (req, res) => {
    res.render("index", {});
})


app.listen(port, () => {
    console.log(`Now listening on port http://localhost:${port}`);
});