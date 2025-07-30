const express = require('express');
const router = express.Router();
module.exports = router;

const course_Mid = require('../middleware/course_Mid');

router.post("/Add", [course_Mid.AddCourse], (req,res) => {
     res.send("Course added successfully");
})