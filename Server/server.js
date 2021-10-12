require("dotenv").config();
const express = require("express");
const db = require("./db");

const app = express();

app.use(express.json());

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

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`server is up and listening on port ${port}`);
});