const Sequelize = require("sequelize");

const connection = new Sequelize("DBsqlite", "", "", {
  host: "localhost",
  dialect: "sqlite",
  storage: "./data/DBsqlite.sqlite",
  define: {
    freezeTableName: true,
    timestamps: false,
  },
});

// start db

connection
  .authenticate()
  .then((result) => {
    console.log("Connection established.");
  })
  .catch((error) => {
    console.log("Unable to connect to db: ", error);
  });

module.exports = connection;
