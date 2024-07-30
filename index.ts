import express, { Express, Request, Response } from "express";
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
import * as jwt from 'jsonwebtoken';
import * as fs from "fs";
const Login = require("./models/login");
const Fritzbox = require("./models/fritzbox");
const cors = require("cors");

// start app
const app: Express = express();

// read body
app.use(bodyParser.json());

// const RSA_PRIVATE_KEY = fs.readFileSync('./demos/private.key');

// Set up CORS
app.use(
  cors({
    origin: true,
    credentials: true, // This MUST be "true" if your endpoint is
    methods: "POST,GET,PUT,OPTIONS,DELETE", // Make sure you're not blocking
  })
);

// Get all users

app.get("/api/login", (req: any, res: { send: (arg0: any) => any; }) => {
  return Login.findAll()
    .then((contacts: any) => res.send(contacts))
    .catch((err: any) => {
      console.log("There was an error querying contacts", JSON.stringify(err));
      return res.send(err);
    });
});

// Login - Get one user

app.post("/api/login", (req: { body: { username: any, password: any }; }, res) => {
  if (!req.body.username || !req.body.password) {
		res.status(400).send('You need a username and password');
		return;
	}

  let { username, password } = req.body;
  const user = Login.findAll({
      where: { Username: username, Password: password },
    })

  if (!user) {
		res.status(401).send('User not found');
		return;
	}

  const token = jwt.sign(
		{
			sub: user.id,
			username: user.username
		},
		'mysupersecretkey',
		{ expiresIn: '3 hours' }
	);

	res.status(200).send({ access_token: token });
  // return Login.findAll({
  //   where: { Username: username, Password: password },
  // })
  //   .then((contacts: any) => res.send(contacts))
  //   .catch((err: any) => {
  //     console.log("There was an error querying contacts", JSON.stringify(err));
  //     return res.send(err);
    // });
});

// Handle fritzbox data

app.get("/api/fritzbox", (req: any, res: { send: (arg0: any) => any; }) => {
  return Fritzbox.findAll()
    .then((v: any) => res.send(v))
    .catch((err: any) => {
      console.log("There was an error querying fritzbox", JSON.stringify(err));
      return res.send(err);
    });
});

app.put("/api/fritzbox/:id", (req, res) => {
  const id = req.params.id;
  const { value } = req.body;
  console.log("updating", req.params.id, req.body);
  Fritzbox.update({ Value: value }, { where: { ID: id } })
    .then((rows: any) => {
      // return number of updated rows
      res.json(rows);
    })
    .catch((error: any) => {
      console.log(error);
      res.status(404).send(error);
    });
});

const accessPort = "8001";
app.listen(accessPort, () => {
  console.log("Running server on port " + accessPort);
});
