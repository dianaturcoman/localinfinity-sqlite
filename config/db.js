const Sequelize = require("sequelize");

const connection = new Sequelize("bica", "", "", {
  host: "localhost",
  dialect: "sqlite",
  storage: "./data/bica.sqlite",
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
