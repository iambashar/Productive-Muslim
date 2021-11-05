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
      "select * from duas order by random();"
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
        posts: results.rows,
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

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`server is up and listening on port ${port}`);
});
