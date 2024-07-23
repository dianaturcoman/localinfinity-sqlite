const express = require("express");
const Sequelize = require("sequelize");
// const LoginModel = require('./models/fritz');

const app = express();
const port = 8001;

const connection = new Sequelize("bica", "", "", {
  host: "localhost",
  dialect: "sqlite",
  storage: "./data/bica.sqlite",
  define: {
    freezeTableName: true,
    timestamps: false,
  },
});

const Login = connection.define("login", {
  Username: Sequelize.TEXT,
  Password: Sequelize.TEXT,
  Accesslevel: Sequelize.INTEGER,
  Lastlogin: Sequelize.INTEGER,
  Lastlogout: Sequelize.INTEGER,
  Lang: Sequelize.TEXT,
  Sessionstatus: Sequelize.INTEGER,
});

app.get("/api/login", (req, res) => {
  return Login.findAll()
    .then((contacts) => res.send(contacts))
    .catch((err) => {
      console.log("There was an error querying contacts", JSON.stringify(err));
      return res.send(err);
    });
});

// connection
//   .sync({
//     logging: console.log,
//   })
//   //   .then(() => {
//   //   User.create({
//   //   name: 'Luke',
//   //   bio: 'Luke bio entry'
//   //   })
//   //   })
//   // .authenticate()
//   .then(() => {
//     console.log("Connection to database established successfully.");
//   })
//   .catch((err) => {
//     console.log("Unable to connect to the database: ", err);
//   });

app.listen(port, () => {
  console.log("Running server on port " + port);
});
