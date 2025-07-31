const { addSlashes } = require("slashes");

async function AddUser(req,res,next) {
    let name    = (req.body.name    !== undefined)  ? addSlashes(req.body.name       ) : "";
    let uname   = (req.body.uname   !== undefined)  ? addSlashes(req.body.uname      ) : "";
    let passwd  = (req.body.passwd  !== undefined)  ? addSlashes(req.body.passwd     ) : "";
    let email   = (req.body.email   !== undefined)  ? addSlashes(req.body.email      ) : "";
    let type_id = (req.body.type_id !== undefined)  ?     Number(req.body.type_id    ) : -1;
    let tz      = (req.body.tz      !== undefined)  ? addSlashes(req.body.tz         ) : "";
    
    let Query ="INSERT INTO users";
    Query += "( `name`, `uname`, `passwd`, `email`, `type_id`, `tz`)";
    Query += " VALUES ";
    Query += `('${name}', '${uname}', '${passwd}', '${email}', ${type_id}, '${tz}')`;
    
    const promisePool = db_pool.promise();
    let rows=[];
    try {
        [rows] = await promisePool.query(Query);
    } catch (err) {
        console.log(err);
    }
    
    next();
}
async function UpdateUser(req,res,next) {
    let id = parseInt(req.params.id);
    let name    = (req.body.name    !== undefined)  ? addSlashes(req.body.name       ) : "";
    let uname   = (req.body.uname   !== undefined)  ? addSlashes(req.body.uname      ) : "";
    let passwd  = (req.body.passwd  !== undefined)  ? addSlashes(req.body.passwd     ) : "";
    let email   = (req.body.email   !== undefined)  ? addSlashes(req.body.email      ) : "";
    let type_id = (req.body.type_id !== undefined)  ?     Number(req.body.type_id    ) : -1;
    let tz      = (req.body.tz      !== undefined)  ? addSlashes(req.body.tz         ) : "";
    
    if(id <= 0) {
        req.GoodOne= false;
        return next();
    }
    req.GoodOne= true;
 
    let Query =`UPDATE User SET `;
     Query += `name    ='${name   }'  ,`; 
     Query += `uname   ='${uname  }'  ,`; 
     Query += `passwd  ='${passwd }'  ,`; 
     Query += `email   ='${email  }'  ,`; 
     Query += `type_id ='${type_id}'  ,`; 
     Query += `tz      ='${tz     }' `; 
     Query += `WHERE id='${id}' `; 
    const promisePool = db_pool.promise();
    let rows=[];

    try {
        [rows] = await promisePool.query(Query);
    } catch (err) {
        console.log(err);
    }
    
    next();
}
async function GetAllUser(req, res,next) {
    let Query =`SELECT * FROM User`;

    const promisePool = db_pool.promise();
    let rows=[];
    req.User_data = [];

    try {
        [rows] = await promisePool.query(Query);
        req.User_data = rows;
    } catch (err) {
        console.log(err);
    }
    
    next();
}
async function DeleteUser(req, res,next) {
    let id = parseInt(req.body.id);
    if(id > 0) { 
        let Query =`DELETE FROM User WHERE id='${id}'`;
        const promisePool = db_pool.promise();
        let rows=[];
        try {
            [rows] = await promisePool.query(Query);
        } catch (err) {
            console.log(err);
        }
    }   
    next();
}
async function GetOneUser(req, res,next) {
   let id = parseInt(req.params.id);
   if((id == NaN) || (id <= 0)) {
        req.GoodOne= false;
        return next();
    }
   req.GoodOne= true;
   let Query =`SELECT * FROM User WHERE id='${id}'`;
    
    const promisePool = db_pool.promise();
    let rows=[];
    req.one_User_data = [];

    try {
        [rows] = await promisePool.query(Query);
        if(rows.length > 0) {
            req.one_User_data = rows[0];
        } 
    } catch (err) {
        console.log(err);
    }
    
    next();
}





module.exports = {
    AddUser,
    GetAllUser,
    DeleteUser,
    GetOneUser,
    UpdateUser
}