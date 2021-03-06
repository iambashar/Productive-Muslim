require("dotenv").config();
const express = require("express");
const db = require("./db");
const cors = require('cors');

const app = express();

const corsOptions = {
  origin: '*',
  credentials: true,            //access-control-allow-credentials:true
  optionSuccessStatus: 200,
}

app.use(cors(corsOptions))

app.use(express.json());


// Get all duas
app.get("/duas", async (req, res) => {
  try {
    const allduas = await db.query(
      "select distinct on (duaid) * from duas;"
    );

    res.status(200).json({
      status: "success",
      results: allduas.rows.length,
      data: {
        duas: allduas.rows,
      },
    });
  } catch (err) {
    console.log(err);
  }
});

// Get all emotions
app.get("/emotions", async (req, res) => {
  try {
    const allemotions = await db.query(
      "select * from emotions;"
    );

    res.status(200).json({
      status: "success",
      results: allemotions.rows.length,
      data: {
        emotions: allemotions.rows,
      },
    });
  } catch (err) {
    console.log(err);
  }
});

//Get dua by emotion
app.get("/emotiondua/:emo", async (req, res) => {
  try {
    const emoduas = await db.query(
      "select * from duas where emotion = $1;", [req.params.emo]
    );

    res.status(200).json({
      status: "success",
      results: emoduas.rows.length,
      data: {
        duas: emoduas.rows,
      },
    });
  } catch (err) {
    console.log(err);
  }
});

//add new user
app.post("/adduser", async (req, res) => {
  try {
    const results = await db.query(
      "INSERT INTO users (userID, name, email, madhab, country, city) values ($1, $2, $3, $4, $5, $6) returning *",
      [req.body.uid, req.body.name, req.body.email, req.body.madhab, req.body.country, req.body.city]
    );
    res.status(201).json({
      status: "success",
      data: {
        users: results.rows[0],
      },
    });
  } catch (err) {
    console.log(err)
  }
});

//update existing user
app.post("/updateuser/:id", async (req, res) => {
  try {
    const results = await db.query(
      "UPDATE users SET name=$2, email=$3, madhab=$4, country=$5, city=$6 where userID=$1 returning *",
      [req.params.id, req.body.name, req.body.email, req.body.madhab, req.body.country, req.body.city]
    );

    res.status(200).json({
      status: "success",
      data: {
        users: results.rows[0],
      },
    });
  } catch (err) {
    console.log(err);
  }
});

//get users details
app.get("/userprofile/:id", async (req, res) => {
  try {
    const users = await db.query(
      "select * from users where userID = $1;", [req.params.id]
    );

    res.status(200).json({
      status: "success",
      results: users.rows.length,
      data: {
        user: users.rows[0]
      },
    });
  } catch (err) {
    console.log(err);
  }
});

//add new myday task
app.post("/addmyday", async (req, res) => {
  try {
    const results = await db.query(
      "INSERT INTO myday (userid, task, isrecurred, isCompleted) values ($1, $2, $3, $4) returning *",
      [req.body.uid, req.body.task, req.body.isRecurred, req.body.isCompleted]
    );
    res.status(201).json({
      status: "success",
      data: {
        myday: results.rows[0],
      },
    });
  } catch (err) {
    console.log(err);
  }
});

//show all myday task
app.get("/showmyday/:id", async (req, res) => {
  try {
    const tasks = await db.query(
      "select * from myday where userID = $1 and (day = CURRENT_DATE or isrecurred = true) order by id;", [req.params.id]
    );

    res.status(200).json({
      status: "success",
      results: tasks.rows.length,
      data: {
        tasks: tasks.rows,
      },
    });
  } catch (err) {
    console.log(err);
  }
});

//delete myday task
app.delete("/deletemydaytask/:id", async (req, res) => {
  try {
    const results = db.query("DELETE FROM myday where id = $1", [
      req.params.id,
    ]);
    res.status(204).json({
      status: "success",
    });
  } catch (err) {
    console.log(err);
  }
});

//edit myday task
app.put("/editmydaytask/:id", async (req, res) => {
  try {
    const results = await db.query(
      "UPDATE myday SET task = $1 where id = $2 returning *",
      [req.body.task, req.params.id]
    );

    res.status(200).json({
      status: "success",
      data: {
        tasks: results.rows[0],
      },
    });
  } catch (err) {
    console.log(err);
  }
});

//set recurred task
app.put("/setrecurred/:id", async (req, res) => {
  try {
    const results = await db.query(
      "UPDATE myday SET isRecurred = $1 where id = $2 returning *",
      [req.body.task, req.params.id]
    );

    res.status(200).json({
      status: "success",
      data: {
        tasks: results.rows[0],
      },
    });
  } catch (err) {
    console.log(err);
  }
});

//set completed task
app.put("/setcompleted/:id", async (req, res) => {
  try {
    const results = await db.query(
      "UPDATE myday SET isCompleted = $1 where id = $2 returning *",
      [req.body.task, req.params.id]
    );

    res.status(200).json({
      status: "success",
      data: {
        tasks: results.rows[0],
      },
    });
  } catch (err) {
    console.log(err);
  }
});

//updating recurred tasks to not completed
app.put("/setrecurredcompleted", async (req, res) => {
  try {
    const results = await db.query(
      "UPDATE myday SET iscompleted = $1, day = CURRENT_DATE where isrecurred = true and day not in (CURRENT_DATE) returning *;",
      [req.body.task]
    );

    res.status(200).json({
      status: "success",
      data: {
        tasks: results.rows[0],
      },
    });
  } catch (err) {
    console.log(err);
  }
});

//delete previous task
app.delete("/deletenotrecurredtask", async (req, res) => {
  try {
    const results = db.query("DELETE FROM myday where isrecurred=false and day not in (CURRENT_DATE);");
    res.status(204).json({
      status: "success",
    });
  } catch (err) {
    console.log(err);
  }
});

//add new planned task
app.post("/addplannedtask", async (req, res) => {


  try {
    console.log(req.body);
    const results = await db.query(
      "INSERT INTO plannedtask (userid, task, isCompleted, isAddedToMyday) values ($1, $2, $3, $4) returning *",
      [req.body.uid, req.body.task, req.body.isCompleted, req.body.isAddedToMyday]
    );
    res.status(201).json({
      status: "success",
      data: {
        myday: results.rows[0],
      },
    });
  } catch (err) {
    console.log(err);
  }
});

//show all planned tasks
app.get("/showplannedtask/:id", async (req, res) => {
  try {
    const tasks = await db.query(
      "select * from plannedtask where userID = $1 and isaddedtomyday = false order by id;", [req.params.id]
    );

    res.status(200).json({
      status: "success",
      results: tasks.rows.length,
      data: {
        tasks: tasks.rows,
      },
    });
  } catch (err) {
    console.log(err);
  }
});

//edit myday task
app.put("/editPlannedtask/:id", async (req, res) => {
  try {
    const results = await db.query(
      "UPDATE plannedtask SET task = $1 where id = $2 returning *",
      [req.body.task, req.params.id]
    );

    res.status(200).json({
      status: "success",
      data: {
        tasks: results.rows[0],
      },
    });
  } catch (err) {
    console.log(err);
  }
});

//update planned date
app.put("/editPlannedtaskdate/:id", async (req, res) => {
  try {
    const results = await db.query(
      "UPDATE plannedtask SET day = $1 where id = $2 returning *",
      [req.body.dateValue, req.params.id]
    );

    res.status(200).json({
      status: "success",
      data: {
        tasks: results.rows[0],
      },
    });
  } catch (err) {
    console.log(err);
  }
});

//delete myday task
app.delete("/deleteplannedtask/:id", async (req, res) => {
  try {
    const results = db.query("DELETE FROM plannedtask where id = $1", [
      req.params.id,
    ]);
    res.status(204).json({
      status: "success",
    });
  } catch (err) {
    console.log(err);
  }
});

//add to myday from planned task
app.post("/addmydayfromplanned", async (req, res) => {
  try {
    const results = await db.query(
      "INSERT INTO myday (userid, task) values ($1, $2) returning *",
      [req.body.uid, req.body.task]
    );
    res.status(201).json({
      status: "success",
      data: {
        myday: results.rows[0],
      },
    });
  } catch (err) {
    console.log(err);
  }
});

//update iscompleted planned task
app.put("/setplannedcompleted/:id", async (req, res) => {
  try {
    const results = await db.query(
      "UPDATE plannedtask SET isCompleted = $1 where id = $2 returning *",
      [req.body.task, req.params.id]
    );

    res.status(200).json({
      status: "success",
      data: {
        tasks: results.rows[0],
      },
    });
  } catch (err) {
    console.log(err);
  }
});

//add to myday from planned task automatically
app.post("/addmydayfromplannedauto", async (req, res) => {
  try {
    const results = await db.query(
      "INSERT INTO myday (userid, task) SELECT userid, task FROM plannedtask WHERE day = CURRENT_DATE;",
    );
    res.status(201).json({
      status: "success",
      data: {
        myday: results.rows[0],
      },
    });
  } catch (err) {
    console.log(err);
  }
});

// delete planned tasks added to my day automatically
app.delete("/deleteplannedtaskauto", async (req, res) => {
  try {
    const results = db.query("DELETE FROM plannedtask where day = CURRENT_DATE",);
    res.status(204).json({
      status: "success",
    });
  } catch (err) {
    console.log(err);
  }
});

//add Sawm Oath
app.post("/addsawmoath", async (req, res) => {
  try {

    const results = await db.query(
      "INSERT INTO mysawm (userid, sawmdate, sawmreason) values ($1, $2, $3) returning *",
      [req.body.uid, req.body.sawmDate, req.body.sawmReason]
    );
    res.status(201).json({
      status: "success",
      data: {
        mySawm: results.rows[0],
      },
    });
  }
  catch (err) {
    //console.log(req.body.uid, req.body.date, req.body.reason);
    console.log(err);
  }
});

// show upcoming sawm dates
app.get("/showupcomingsawmdates/:id", async (req, res) => {
  try {
    const dates = await db.query(
      "SELECT * FROM mysawm WHERE userID = $1;", [req.params.id] //AND sawmdate >= (SELECT TO_CHAR(NOW() :: DATE, 'dd-mm-yyyy'))
    );

    res.status(200).json({
      status: "success",
      results: dates.rows.length,
      data: {
        dates: dates.rows,
      },
    });
  }
  catch (err) {
    console.log(err);
  }
});

//delete sawm
app.delete("/deletesawm/:id", async (req, res) => {
  try {
    const results = db.query("DELETE FROM mysawm where id = $1", [
      req.params.id,
    ]);
    res.status(204).json({
      status: "success",
    });
  } catch (err) {
    console.log(err);
  }
});

//get all missed planned task
app.get("/showplannedmissedtask/:id", async (req, res) => {
  try {
    const tasks = await db.query(
      "select * from plannedtask where userID = $1 and isaddedtomyday = false order by id;", [req.params.id]
    );

    res.status(200).json({
      status: "success",
      results: tasks.rows.length,
      data: {
        tasks: tasks.rows,
      },
    });
  } catch (err) {
    console.log(err);
  }
});

//create new task list
app.post("/createnewlist", async (req, res) => {
  try {
    console.log(req.body);
    const results = await db.query(
      'INSERT INTO tasklist (userid, listname) values ($1, $2) returning *',
      [req.body.uid, req.body.listname]
    );
    res.status(201).json({
      status: "success",
      data: {
        myday: results.rows[0],
      },
    });
    console.log(res.status);
  } catch (err) {
    console.log(err);
  }
});

//delete task list
app.delete("/deletelist/:id", async (req, res) => {
  try {
    const results = db.query("DELETE FROM tasklist where id = $1", [
      req.params.id,
    ]);
    res.status(204).json({
      status: "success",
    });
  } catch (err) {
    console.log(err);
  }
});

//delete list content against list
app.delete("/deletelistcontentagainstlist/:id", async (req, res) => {
  try {
    const results = db.query("DELETE FROM tasklistcontent where listid = $1", [
      req.params.id,
    ]);
    res.status(204).json({
      status: "success",
    });
  } catch (err) {
    console.log(err);
  }
});

//get all task list
app.get("/showtasklist/:id", async (req, res) => {
  try {
    const tasks = await db.query(
      "select * from tasklist where userID = $1 order by id;", [req.params.id]
    );

    res.status(200).json({
      status: "success",
      results: tasks.rows.length,
      data: {
        tasks: tasks.rows,
      },
    });
  } catch (err) {
    console.log(err);
  }
});

//add task to list
app.post("/addtasktolist", async (req, res) => {
  

  try {
    console.log(req.body);
    const results = await db.query(
      "INSERT INTO tasklistcontent (listid, task, isCompleted) values ($1, $2, $3) returning *",
      [req.body.listID, req.body.task, req.body.isCompleted]
    );
    res.status(201).json({
      status: "success",
      data: {
        myday: results.rows[0],
      },
    });
  } catch (err) {
    console.log(err);
  }
});

//show list content
app.get("/showlistcontent/:id", async (req, res) => {
  try{
    const tasks = await db.query(
      "select * from tasklistcontent where listID = $1 order by id;", [req.params.id]
    );

    res.status(200).json({
      status: "success",
      results: tasks.rows.length,
      data: {
        tasks : tasks.rows,
      },
    });
  } catch (err) {
    console.log(err);
  }
});

//set completed list content
app.put("/setcompletedcontent/:id", async (req, res) => {
  try {
    const results = await db.query(
      "UPDATE tasklistcontent SET isCompleted = $1 where id = $2 returning *",
      [req.body.task, req.params.id]
    );

    res.status(200).json({
      status: "success",
      data: {
        tasks: results.rows[0],
      },
    });
  } catch (err) {
    console.log(err);
  }
});

//delete list content
app.delete("/deletelistcontent/:id", async (req, res) => {
  try {
    const results = db.query("DELETE FROM tasklistcontent where id = $1", [
      req.params.id,
    ]);
    res.status(204).json({
      status: "success",
    });
  } catch (err) {
    console.log(err);
  }
});


//add to myday from list
app.post("/addmydayfromlist", async (req, res) => {
  try {
    const results = await db.query(
      "INSERT INTO myday (userid, task) values ($1, $2) returning *",
      [req.body.uid, req.body.task]
    );
    res.status(201).json({
      status: "success",
      data: {
        myday: results.rows[0],
      },
    });
  } catch (err) {
    console.log(err);
  }
});

//edit list content
app.put("/editlistcontent/:id", async (req, res) => {
  console.log(req);
  try {
    const results = await db.query(
      "UPDATE tasklistcontent SET task = $1 where id = $2 returning *",
      [req.body.task, req.params.id]
    );

    res.status(200).json({
      status: "success",
      data: {
        tasks: results.rows[0],
      },
    });
  } catch (err) {
    console.log(err);
  }
});

//create new Post
app.post("/createpost/:id", async (req, res) => {
  try {
    const results = await db.query(
      'INSERT INTO forumpost (userid, username, title, description, upvote, commentcount) values ($1, $2, $3, $4, $5, $6) returning *',
      [req.params.id, req.body.userName, req.body.title, req.body.description, req.body.upVote, req.body.comments]
    );
    res.status(201).json({
      status: "success",
      data: {
        forumpost: results.rows[0],
      },
    });

  } catch (err) {
    console.log(err);
  }
});

//delete forum post
app.delete("/deleteforumpost", async (req, res) => {
  try {
    const results = db.query("DELETE FROM forumpost where postid = $1", [req.body.postID]);
    res.status(204).json({
      status: "success",
    });
  } catch (err) {
    console.log(err);
  }
});

//get all Posts
app.get("/showposts", async (req, res) => {
  try {
    const results = await db.query(
      "select * from forumpost order by postid desc;",
    );

    res.status(200).json({
      status: "success",
      results: results.rows.length,
      data: {
        posts: results.rows,
      },
    });
  } catch (err) {
    console.log(err);
  }
});

//get current users all Posts
app.get("/showuserposts/:id", async (req, res) => {
  try {
    const results = await db.query(
      "select * from forumpost where userid=$1 order by postid desc;", [req.params.id]
    );

    res.status(200).json({
      status: "success",
      results: results.rows.length,
      data: {
        posts: results.rows,
      },
    });
  } catch (err) {
    console.log(err);
  }
});

//add new Comment
app.post("/createcomment", async (req, res) => {
  try {
    const results = await db.query(
      'INSERT INTO comments (postid, userid, username, comment) values ($1, $2, $3, $4) returning *',
      [req.body.postID, req.body.uid, req.body.userName, req.body.commentcontent]
    );
    res.status(201).json({
      status: "success",
      data: {
        comments: results.rows[0],
      },
    });

  } catch (err) {
    console.log(err);
  }
});

//delete comment
app.delete("/deletecomment", async (req, res) => {
  try {
    const results = db.query("DELETE FROM comments where commentid = $1 and userid = $2",
     [req.body.commentid, req.body.uid]);
    res.status(204).json({
      status: "success",
    });
  } catch (err) {
    console.log(err);
  }
});

//get all Comments
app.get("/showcomments", async (req, res) => {
  try {
    const results = await db.query(
      "select * from comments order by commentid desc;",
    );

    res.status(200).json({
      status: "success",
      results: results.rows.length,
      data: {
        comments: results.rows,
      },
    });
  } catch (err) {
    console.log(err);
  }
});

//get searched post
app.get("/searchpost/:id", async (req, res) => {
  try {
    const results = await db.query(
      "select * from forumpost where title like $1;", [req.params.id]
    );

    res.status(200).json({
      status: "success",
      results: results.rows.length,
      data: {
        search: results.rows,
      },
    });
  } catch (err) {
    console.log(err);
  }
});

//update commetcount
app.put("/updatecommentcount", async (req, res) => {
  try {
    const results = await db.query(
      "UPDATE forumpost SET commentcount=$1 where postid=$2 returning *",
      [req.body.comment, req.body.postID]
    );

    res.status(200).json({
      status: "success",
      data: {
        posts: results.rows,
      },
    });
  } catch (err) {
    console.log(err);
  }
});

//update upvote
app.put("/updateupvote", async (req, res) => {
  try {
    const results = await db.query(
      "UPDATE forumpost SET upvote=$1 where postid=$2 returning *",
      [req.body.vote, req.body.postID]
    );

    res.status(200).json({
      status: "success",
      data: {
        forumpost: results.rows,
      },
    });
  } catch (err) {
    console.log(err);
  }
});

//update commentCount
app.put("/updatecommentcount", async (req, res) => {
  try {
    const results = await db.query(
      "UPDATE forumpost SET commentcount=$1 where postid=$2 returning *",
      [req.body.comment, req.body.postID]
    );

    res.status(200).json({
      status: "success",
      data: {
        posts: results.rows,
      },
    });
  } catch (err) {
    console.log(err);
  }
});

//add new upVote
app.post("/addupvote", async (req, res) => {
  try {
    const results = await db.query(
      'INSERT INTO upvotes (postid, userid) values ($1, $2) returning *',
      [req.body.postID, req.body.uid]
    );
    res.status(201).json({
      status: "success",
      data: {
        upvotes: results.rows[0],
      },
    });

  } catch (err) {
    console.log(err);
  }
});

//delete upvote
app.delete("/deleteupvote", async (req, res) => {
  try {
    const results = db.query("DELETE FROM upvotes where postid = $1 and userid = $2;",
      [req.body.postID, req.body.uid]);
    res.status(204).json({
      status: "success",
    });
  } catch (err) {
    console.log(err);
  }
});

//get upvotelist
app.get("/getupvotes/:id", async (req, res) => {
  try {
    const results = await db.query(
      "select * from upvotes where userid = $1;", [req.params.id],
    );

    res.status(200).json({
      status: "success",
      results: results.rows.length,
      data: {
        upvotes: results.rows,
      },
    });
  } catch (err) {
    console.log(err);
  }
});

//add new favourite dua
app.post("/addfavdua", async (req, res) => {
  try {
    const results = await db.query(
      'INSERT INTO favouritecount (duaid, userid) values ($1, $2) returning *',
      [req.body.duaID, req.body.uid]
    );
    res.status(201).json({
      status: "success",
      data: {
        favouritecount: results.rows[0],
      },
    });

  } catch (err) {
    console.log(err);
  }
});

//delete favourite dua
app.delete("/deletefavdua", async (req, res) => {
  try {
    const results = db.query("DELETE FROM favouritecount where duaid = $1 and userid = $2;",
      [req.body.duaID, req.body.uid]);
    res.status(204).json({
      status: "success",
    });
  } catch (err) {
    console.log(err);
  }
});

//get favourite dua favouritecount
app.get("/getfavduacount/:id", async (req, res) => {
  try {
    const results = await db.query(
      "select * from favouritecount where userid = $1;", [req.params.id],
    );

    res.status(200).json({
      status: "success",
      results: results.rows.length,
      data: {
        favouritecount: results.rows,
      },
    });
  } catch (err) {
    console.log(err);
  }
});

app.get("/getfavdua/:id", async (req, res) => {
  try {
    const results = await db.query(
      "select DISTINCT ON (duaid) * from duas where duaid in (select duaid from favouritecount where userid = $1);", [req.params.id],
    );

    res.status(200).json({
      status: "success",
      results: results.rows.length,
      data: {
        dua: results.rows,
      },
    });
  } catch (err) {
    console.log(err);
  }
});

//update 
app.put("/updatefavdua", async (req, res) => {
  try {
    const results = await db.query(
      "UPDATE duas SET favouritecount=$1 where duaid=$2 returning *",
      [req.body.fc, req.body.duaID]
    );

    res.status(200).json({
      status: "success",
      data: {
        duas: results.rows,
      },
    });
  } catch (err) {
    console.log(err);
  }
});

//add Salah Waqt Done
app.post("/addwaqtdone", async (req, res) => {
  try{
    const res1 = await db.query(
      "SELECT * from mysalah where userid = $1 and waqt = $2 AND (day = CURRENT_DATE);", [req.body.uid, req.body.waqt]
    )
    if(res1.rows.length){
      const res2 = await db.query(
        "DELETE from mysalah where userid = $1 and waqt = $2 AND (day = CURRENT_DATE) returning *;", [req.body.uid, req.body.waqt]
      );
      res.status(201).json({
        status: "success",
        data: {
          mySalah: res2.rows[0],
        },
      });
    }
    else{
    const results = await db.query(
      "INSERT INTO mysalah (userid, waqt, isDone) values ($1, $2, $3) returning *",
      [req.body.uid, req.body.waqt, req.body.isDone]
    );
    res.status(201).json({
      status: "success",
      data: {
        mySalah: results.rows[0],
      },
    });
  }
  }
  catch (err){
    //console.log(req.body.uid, req.body.date, req.body.reason);
    console.log(err);
  }
});

// show done waqts
app.get("/showdonewaqts/:id", async (req, res) => {
  try{
    const waqts = await db.query(
      "SELECT * FROM mysalah WHERE userID = $1 AND day = CURRENT_DATE;", [req.params.id] //AND sawmdate >= (SELECT TO_CHAR(NOW() :: DATE, 'dd-mm-yyyy'))
    );

    res.status(200).json({
      status: "success",
      results: waqts.rows.length,
      data: {
        waqts: waqts.rows,
      },
    });
  }
  catch (err){
    console.log(err);
  }
});

// get waqt done?
app.get("/waqtdone/:uid", async (req, res) => {
  try{
    const isDone = await db.query(
      "SELECT * FROM mysalah WHERE userID = $1 AND day = CURRENT_DATE;", 
        [req.params.uid]
    );
    res.status(200).json({
      status: "success",
      results: isDone.rows.length,
      data: {
        waqts: isDone.rows,
      },
    });
  }
  catch (err){
    console.log(err);
  }
});

//add Challenge Done
app.post("/addchallengedone", async (req, res) => {
  try{
    const res1 = await db.query(
      "SELECT * from mychallenge where userid = $1 and challenge = $2 AND (day = CURRENT_DATE);", [req.body.uid, req.body.challenge]
    )
    if(res1.rows.length){
      const res2 = await db.query(
        "DELETE from mychallenge where userid = $1 and challenge = $2 AND (day = CURRENT_DATE) returning *;", [req.body.uid, req.body.challenge]
      );
      res.status(201).json({
        status: "success",
        data: {
          myChallenge: res2.rows[0],
        },
      });
    }
    else{
    const results = await db.query(
      "INSERT INTO mychallenge (userid, challenge, isChallengeDone) values ($1, $2, $3) returning *",
      [req.body.uid, req.body.challenge, req.body.isChallengeDone]
    );
    res.status(201).json({
      status: "success",
      data: {
        myChallenge: results.rows[0],
      },
    });
  }
  }
  catch (err){
    //console.log(req.body.uid, req.body.date, req.body.reason);
    console.log(err);
  }
});

// get waqt done?
app.get("/challengedone/:uid", async (req, res) => {
  try{
    const isChallengeDone = await db.query(
      "SELECT * FROM mychallenge WHERE userID = $1;", 
        [req.params.uid]
    );
    res.status(200).json({
      status: "success",
      results: isChallengeDone.rows.length,
      data: {
        challenges: isChallengeDone.rows,
      },
    });
  }
  catch (err){
    console.log(err);
  }
});

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`server is up and listening on port ${port}`);
});
