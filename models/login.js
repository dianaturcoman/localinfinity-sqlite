const sequelize = require("../config/db");
const { DataTypes } = require("sequelize");
const Sequelize = require("sequelize");

const Login = sequelize.define(
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
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    Lastlogin: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    Lastlogout: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    Lang: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    Sessionstatus: {
      type: DataTypes.INTEGER,
    },
  },
  {
    sequelize,
    freezeTableName: true,
    tableName: "login",
    timestamps: false,
  }
);

Login.removeAttribute("id");

module.exports = Login;
