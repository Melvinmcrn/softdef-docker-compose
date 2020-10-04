const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const port = 8000;

const mysql = require("mysql");
const connection = mysql.createConnection({
  host: process.env.DB_ENDPOINT || "localhost",
  port: 3306,
  user: "melvin",
  password: "1234",
  database: "my_db",
});

// connection.connect();

const corsConfig = function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.header(
    "Access-Control-Allow-Headers",
    "X-Requested-With, Accept, Origin, Referer, User-Agent, Content-Type, Authorization"
  );

  // intercept OPTIONS method
  if (req.method === "OPTIONS") {
    res.sendStatus(200);
  } else {
    next();
  }
};

app.all("*", corsConfig);

app.use(bodyParser.urlencoded());

app.use(bodyParser.json());

app.get("/name", (req, res) => {
  if (connection.state === "disconnected") {
    connection.connect();
  }
  let data = { nameList: [] };
  try {
    connection.query("SELECT * FROM name_list;", (err, result, field) => {
      if (err) {
        console.log("error");
        console.log(err);
        res.sendStatus(500);
      }
      if (result.length > 0) {
        JSON.parse(JSON.stringify(result)).forEach((item) => {
          data.nameList.push(item.name);
        });
      }

      res.send(data);
    });
  } catch (error) {
    console.log(error);
  }
});

app.post("/name", (req, res) => {
  if (connection.state === "disconnected") {
    connection.connect();
  }
  try {
    connection.query(
      "INSERT INTO name_list (name) VALUES ('" + req.body.data.name + "');",
      (err, result, field) => {
        if (err) {
          console.log("error");
          console.log(err);
          res.sendStatus(500);
        }
      }
    );
  } catch (error) {
    console.log(error);
  }

  res.sendStatus(200);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
