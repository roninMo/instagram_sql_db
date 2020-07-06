let express = require("express");
let app = express();
let mysql = require("mysql");
let fdata = require("faker");
const bodyParser = require("body-parser");
const morgan = require("morgan");

// This is server stuff for handling req/res, and parsing through information
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("combined"));
app.set("view engine", "ejs");

let msql = mysql.createConnection({
  host: "127.0.0.1",
  port: "3306",
  user: "root",
  password: "Kieran30437",
  database: "ig_db",
});

msql.connect((err) => {
  if (err) throw err;
  console.log("Connected to database");
});

app.get("/", (req, res) => {
  console.log(`Get request on home page site`);
  let sql = `SELECT COUNT(*) AS count FROM users;`;
  let count;
  msql.query(sql, (err, results, fields) => {
    if (err) throw err;
    count = results[0].count;
    res.render("home", { data: count });
  });
});

app.get("/users", (req, res) => {
  console.log(`getting the users within the database`);
  let sql = `SELECT * FROM users`;
  msql.query(sql, (err, rows, fields) => {
    res.send(rows);
  });
});

app.get("/createNewUsers", (req, res) => {
  console.log(`Adding 500 users to the db`);
  let persons = [];
  for (let i = 0; i < 500; i++) {
    persons.push([fdata.internet.email(), fdata.date.past()]);
  }

  let sql = `INSERT INTO users (email, created_at) VALUES ?`;
  /*let data = */ msql.query(sql, [persons], (err, results, fields) => {
    if (err) throw err;
    console.log(results);
    res.send(results);
  });
});

app.post("/user", (req, res) => {
  console.log(`Insert a new user`);
  console.log(req.body.email);
  let email = req.body.email;
  let sql = `INSERT INTO users (email) VALUES ?`;
  msql.query(sql, [email], (err, results, fields) => {
    if (err) res.status(500).json({ error: err, msg: "error" });
    res.status(200).send(results);
  });
});

app.post("/register", function (req, res) {
  var person = {
    email: req.body.email,
  };
  connection.query("INSERT INTO users SET ?", person, function (err, result) {
    if (err) throw err;
    res.redirect("/");
  });
});

app.listen(3000, () => {
  console.log(`App listening on port 3000`);
});
