async function AddNewActivity(req,res,next){
    let user_id = req.user_id;
    let study_date=(req.body.study_date !== undefined)?addSlashes(req.body.study_date):"";
    let course_id =(req.body.course_id !== undefined )?Number(req.body.course_id ):"";
    let start_time =(req.body.start_time !== undefined )?addSlashes(req.body.start_time ):"";
    let end_time =(req.body.end_time !== undefined )?addSlashes(req.body.end_time ):"";
    let notes =(req.body.notes !== undefined )?addSlashes(req.body.notes ):"";
    let is_plan = 1;

    let Query = "INSERT INTO `study_data`";
    Query += "( `user_id`, `study_date`, `course_id`, `start_time`, `end_time`, `is_plan`, `notes`)  ";
    Query += " VALUES ";
    Query += `( '${user_id}', '${study_date}', '${course_id}', '${start_time}', '${end_time}', '${is_plan}', '${notes}')  `;

    req.ok=false;
    const promisePool = db_pool.promise();
    let rows=[];
    try {
        [rows] = await promisePool.query(Query);
        req.ok=true;
    } catch (err) {
        console.log(err);
    }
    next();
}

async function GetAllActivities(req,res,next){
    let sd          = (req.query.sd !== undefined)       ? addSlashes(req.query.sd)         : "";
    let ed          = (req.query.ed !== undefined)       ? addSlashes(req.query.ed)         : "";
    let free_txt    = (req.query.free_txt !== undefined) ? addSlashes(req.query.free_txt)   : "";
    let crs_id    = (req.query.crs_id !== undefined) ? Number(req.query.crs_id)   : -1;
    req.filter_params={
        sd          : sd      ,
        ed          : ed      ,
        free_txt    : free_txt,
        crs_id      : crs_id    ,
    };

    let Query="SELECT *,DATE_FORMAT(study_date,'%d-%m-%Y') AS nice_date FROM study_data";
    let wh="";
    if(sd !== ""){
        wh += (wh === "")?" WHERE " : " AND ";
        wh += ` ( study_date >= '${sd}' )`;
    }
    if(ed !== ""){
        wh += (wh === "")?" WHERE " : " AND ";
        wh += ` ( study_date < '${ed}' )`;
    }
    if(free_txt !== ""){
        wh += (wh === "")?" WHERE " : " AND ";
        wh += ` ( notes LIKE '%${free_txt}%' )`;
    }
    Query += wh;
    Query += " ORDER BY study_date DESC, start_time DESC ";
    // Query+= " LIMIT 0,100 ";
    console.log(Query);

    const promisePool = db_pool.promise();
    let rows=[];
    req.activity_data=[];
    try {
        [rows] = await promisePool.query(Query);
        req.activity_data=rows;
    } catch (err) {
        console.log(err);
    }

    next();
}
module.exports = {
    AddNewActivity,
    GetAllActivities,
}