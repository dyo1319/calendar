async function AddCourse(req,res,next) {
    let name = addSlashes(req.body.name);
    let Query =`INSERT INTO courses(name) VALUES ('${name}')`;
    const promisePool = db_pool.promise();
    let rows=[];
    try {
        [rows] = await promisePool.query(Query);
    } catch (err) {
        console.log(err);
    }
    
    next();
}

module.exports = {
    AddCourse,
}