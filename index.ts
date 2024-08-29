import express, { Express } from "express";
import jwt from 'jsonwebtoken';

// HTTP
const cors = require("cors");
const bodyParser = require('body-parser');

// DB
const connection = require("./config/db");
const Login = require("./models/login");
const Misc = require("./models/misc");

// AUTH
const RSA_PRIVATE_KEY = require("./config/utils");
const authenticateToken = require("./config/auth");

// START
const app: Express = express();

// read body
app.use(bodyParser.json());

// Set up CORS
app.use(
  cors({
    origin: true,
    credentials: true, // This MUST be "true" if your endpoint is
    methods: "POST,GET,PUT,OPTIONS,DELETE,PATCH", // Make sure you're not blocking
  })
);

// GET all users

app.get("/api/login", authenticateToken, (req: any, res: { send: (arg0: any) => any; }) => {
  return Login.findAll()
    .then((contacts: any) => res.send(contacts))
    .catch((err: any) => {
      console.log("There was an error querying contacts", JSON.stringify(err));
      return res.send(err);
    });
});

// Login :: GET one user

app.post("/api/login", (req: { body: { username: any, password: any }; }, res) => {
  if (!req.body.username || !req.body.password) {
    res.status(400).send('You need a username and password');
    return;
  }

  let { username, password } = req.body;
  return Login.findAll({
    where: { Username: username, Password: password },
  }).then((contacts: any) => {
    const user = contacts[0];
    const jwtBearerToken = jwt.sign(
      {
        sub: user.id,
        username: user.username
      },
      RSA_PRIVATE_KEY,
    );
    console.log("returning status 200", jwtBearerToken);
    res.status(200).json({ idToken: jwtBearerToken, expiresIn: '120', user });
  }).catch((err: any) => {
    console.log("There was an error querying contacts", JSON.stringify(err));
    console.log("returning status 401");
    res.status(401).send('User not found');
  });
});

// GET admin message

app.get("/api/adminmessage", authenticateToken, (req: any, res: { send: (arg0: any) => any; }) => {
  return Misc.findAll({
    where: { Field: 'AdminMessage' },
  })
    .then((response: any) => res.send(response[0]))
    .catch((err: any) => {
      console.log("There was an error querying misc table", JSON.stringify(err));
      return res.send(err);
    });
});

// PUT admin message

app.patch("/api/adminmessage", authenticateToken, (req: any, res: { send: (arg0: any) => any; }) => {
  var body = req.body;
  console.log("api received message", body.message);

  Misc.update({
    Value:  req.body.message
  }, {
    where: {
      Field: "AdminMessage"
    }
  })
    .then((rows: any) => {
      rows;
    })
    .catch((error: any) => {
      console.log(error);
    })
})

const accessPort = "8001";
app.listen(accessPort, () => {
  console.log("Running server on port " + accessPort);
});

