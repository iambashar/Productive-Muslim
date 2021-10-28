require("dotenv").config();
const express = require("express");
const db = require("./db");
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors());

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
      "INSERT INTO myday (userid, task, isrecurred) values ($1, $2, $3) returning *",
      [req.body.uid, req.body.task, req.body.isRecurred]
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
      "select * from myday where userID = $1 and day = CURRENT_DATE;", [req.params.id]
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
      status: "sucess",
    });
  } catch (err) {
    console.log(err);
  }
});

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`server is up and listening on port ${port}`);
});