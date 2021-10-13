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
      "select * from duas;"
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

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`server is up and listening on port ${port}`);
});