const express = require('express');
const router = express.Router();
module.exports = router;

const user_Mid = require('../middleware/user_Mid');

router.get("/Add", (req, res) => {
    res.render("crs_add", {
        data: {},
    });
});
router.post("/Add", [user_Mid.AddUser], (req,res) => {
    res.redirect("/crs/List");
});
router.get("/Edit/:id", [user_Mid.GetOneUser], (req, res) => {
    if(req.GoodOne) {
        res.render("crs_add", {
        data : req.one_Users_data,
        });
    } else {
        res.redirect("/crs/List");
    }
});
router.post("/Edit/:id", [user_Mid.UpdateUser], (req,res) => {
    res.redirect("/crs/List");
});
router.get("/List", [user_Mid.GetAllUser], (req, res) => {
    res.render("crs_list", {
        page_title: "List of Users",  
        Users: req.Users_data,
    });
});
router.post("/Delete", [user_Mid.DeleteUser], (req, res) => { 
    res.redirect("/crs/List");
});


