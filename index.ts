import express, { Express, Request, Response, NextFunction } from "express";
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
import * as fs from "fs";
const Login = require("./models/login");
const cors = require("cors");
import jwt, { Secret, JwtPayload } from 'jsonwebtoken';

// const RSA_PRIVATE_KEY = fs.readFileSync('./demos/private.key');
export const RSA_PRIVATE_KEY: Secret = 'your-secret-key-here';

// start app
const app: Express = express();

// read body
app.use(bodyParser.json());

// Set up CORS
app.use(
  cors({
    origin: true,
    credentials: true, // This MUST be "true" if your endpoint is
    methods: "POST,GET,PUT,OPTIONS,DELETE", // Make sure you're not blocking
  })
);

// Get all users

export interface CustomRequest extends Request {
  token: string | JwtPayload;
 }

export const authenticateToken = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
      throw new Error();
    }

    const decoded = jwt.verify(token, RSA_PRIVATE_KEY);
    (req as CustomRequest).token = decoded;

    next();
  } catch (err) {
    res.status(401).send('Please authenticate');
  }
 };

app.get("/api/login", authenticateToken, (req: any, res: { send: (arg0: any) => any; }) => {
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

const accessPort = "8001";
app.listen(accessPort, () => {
  console.log("Running server on port " + accessPort);
});

