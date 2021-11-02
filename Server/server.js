require("dotenv").config();
const express = require("express");
const db = require("./db");
const cors = require('cors');

const app = express();

const corsOptions ={
  origin:'*', 
  credentials:true,            //access-control-allow-credentials:true
  optionSuccessStatus:200,
}

app.use(cors(corsOptions))

app.use(express.json());


// Get all duas
app.get("/duas", async (req, res) => {
  try{
    const allduas = await db.query(
      "select * from duas order by random();"
    );

    res.status(200).json({
      status: "success",
      results: allduas.rows.length,
      data: {
        duas : allduas.rows,
      },
    });
  } catch (err) {
    console.log(err);
  }
});

// Get all emotions
app.get("/emotions", async (req, res) => {
  try{
    const allemotions = await db.query(
      "select * from emotions;"
    );

    res.status(200).json({
      status: "success",
      results: allemotions.rows.length,
      data: {
        emotions : allemotions.rows,
      },
    });
  } catch (err) {
    console.log(err);
  }
});

//Get dua by emotion
app.get("/emotiondua/:emo", async (req, res) => {
  try{
    const emoduas = await db.query(
      "select * from duas where emotion = $1;", [req.params.emo]
    );

    res.status(200).json({
      status: "success",
      results: emoduas.rows.length,
      data: {
        duas : emoduas.rows,
      },
    });
  } catch (err) {
    console.log(err);
  }
});

//add new myday task
app.post("/addmyday", async (req, res) => {
  

  try {
    console.log(req.body);
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
  try{
    const tasks = await db.query(
      "select * from myday where userID = $1 and (day = CURRENT_DATE or isrecurred = true) order by id;", [req.params.id]
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
      [req.body.iscompleted]
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

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`server is up and listening on port ${port}`);
});