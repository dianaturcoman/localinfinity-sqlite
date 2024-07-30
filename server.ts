const express = require("express");
const Login = require("./models/login");
const Fritzbox = require("./models/fritzbox");
const cors = require("cors");

// start app
const app = express();

// read body
app.use(express.json());

// Set up CORS
app.use(
  cors({
    origin: true, // "true" will copy the domain of the request back
    // to the reply. If you need more control than this
    // use a function.

    credentials: true, // This MUST be "true" if your endpoint is
    // authenticated via either a session cookie
    // or Authorization header. Otherwise the
    // browser will block the response.

    methods: "POST,GET,PUT,OPTIONS,DELETE", // Make sure you're not blocking
    // pre-flight OPTIONS requests
  })
);

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

// Handle fritzbox data

app.get("/api/fritzbox", (req, res) => {
  return Fritzbox.findAll()
    .then((v) => res.send(v))
    .catch((err) => {
      console.log("There was an error querying fritzbox", JSON.stringify(err));
      return res.send(err);
    });
});

app.put("/api/fritzbox/:id", (req, res) => {
  const id = req.params.id;
  const { value } = req.body;
  console.log("updating", req.params.id, req.body);
  Fritzbox.update({ Value: value }, { where: { ID: id } })
    .then((rows) => {
      // return number of updated rows
      res.json(rows);
    })
    .catch((error) => {
      console.log(error);
      res.status(404).send(error);
    });
});

const accessPort = "8001";
app.listen(accessPort, () => {
  console.log("Running server on port " + accessPort);
});
