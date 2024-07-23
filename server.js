const express = require("express");
const Login = require("./models/login");

// start app
const app = express();
const port = 8001;

app.get("/api/login", (req, res) => {
  return Login.findAll()
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
