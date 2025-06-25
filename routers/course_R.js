const express = require('express');
const { addSlashes } = require('slashes');
const router = express.Router();
module.exports = router;

router.post("Add", async (req,res) => {
    let name = addSlashes(req.body.name);
    let Query =`INSERT INTO courses(name) VALUES ('${name}')`;

    const promisePool = db_pool.promise();
    let rows=[];
    try {
        [rows] = await promisePool.query(Query);
    } catch (err) {
        console.log(err);
    }
})