const connection = require("../config/db");
const Sequelize = require("sequelize");

const Login = connection.define(
  "login",
  {
    ID: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    Username: {
      type: Sequelize.TEXT,
      allowNull: false,
    },
    Password: {
      type: Sequelize.TEXT,
      allowNull: false,
    },
    Accesslevel: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    Lastlogin: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    Lastlogout: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    Lang: {
      type: Sequelize.TEXT,
      allowNull: false,
    },
    Sessionstatus: {
      type: Sequelize.INTEGER,
    },
  },
  {
    connection,
    freezeTableName: true,
    tableName: "login",
    timestamps: false,
  }
);

Login.removeAttribute("id");

module.exports = Login;
