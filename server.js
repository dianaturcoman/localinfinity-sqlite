const express = require("express");
const Login = require("./models/login");
const Fritzbox = require("./models/fritzbox");

// start app
const app = express();
const port = 8001;

app.use(express.json());

// Get all users

app.get("/api/login", (req, res) => {
  return Login.findAll()
    .then((contacts) => res.send(contacts))
    .catch((err) => {
      console.log("There was an error querying contacts", JSON.stringify(err));
      return res.send(err);
    });
});

// Login - Get one user

app.post("/api/login", (req, res) => {
  let { username } = req.body;
  return Login.findAll({
    where: { Username: username },
  })
    .then((contacts) => res.send(contacts))
    .catch((err) => {
      console.log("There was an error querying contacts", JSON.stringify(err));
      return res.send(err);
    });
});

// Get fritzbox data

app.get("/api/fritzbox", (req, res) => {
  return Fritzbox.findAll()
    .then((contacts) => res.send(contacts))
    .catch((err) => {
      console.log("There was an error querying contacts", JSON.stringify(err));
      return res.send(err);
    });
});

app.listen(port, () => {
  console.log("Running server on port " + port);
});

// module.exports = app;
