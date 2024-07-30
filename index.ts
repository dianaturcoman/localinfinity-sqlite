// import {Request, Response} from "express";
// import * as express from 'express';
import express, { Express, Request, Response } from "express";

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
import * as jwt from 'jsonwebtoken';
import * as fs from "fs";

// import dotenv from "dotenv";
// dotenv.config();

// const express = require("express");
const Login = require("./models/login");
const Fritzbox = require("./models/fritzbox");
const cors = require("cors");

// start app
// const app: Application = express();
const app: Express = express();

// read body
// app.use(express.json());
app.use(bodyParser.json());

const RSA_PRIVATE_KEY = fs.readFileSync('./demos/private.key');

export function loginRoute(req: Request, res: Response) {

  const email = req.body.email,
        password = req.body.password;

  if (validateEmailAndPassword()) {
     const userId = findUserIdForEmail(email);

      const jwtBearerToken = jwt.sign({}, RSA_PRIVATE_KEY, {
              algorithm: 'RS256',
              expiresIn: 120,
              subject: userId
          });

        // send the JWT back to the user
        // TODO - multiple options available
  }
  else {
      // send status 401 Unauthorized
      res.sendStatus(401);
  }
}

function validateEmailAndPassword(){
  return true;
}

function findUserIdForEmail(email: string){
  return '';
}

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

app.get("/api/login", (req: any, res: { send: (arg0: any) => any; }) => {
  return Login.findAll()
    .then((contacts: any) => res.send(contacts))
    .catch((err: any) => {
      console.log("There was an error querying contacts", JSON.stringify(err));
      return res.send(err);
    });
});

// Login - Get one user

app.post("/api/login", (req: { body: { username: any; }; }, res: { send: (arg0: any) => any; }) => {
  let { username } = req.body;
  return Login.findAll({
    where: { Username: username },
  })
    .then((contacts: any) => res.send(contacts))
    .catch((err: any) => {
      console.log("There was an error querying contacts", JSON.stringify(err));
      return res.send(err);
    });
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
