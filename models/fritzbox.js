const connection = require("../config/db");
const Sequelize = require("sequelize");

const Fritzbox = connection.define(
  "fritz",
  {
    ID: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    Field: {
      type: Sequelize.TEXT,
      allowNull: true,
    },
    Value: {
      type: Sequelize.TEXT,
      allowNull: true,
    },
  },
  {
    connection,
    freezeTableName: true,
    tableName: "fritz",
    timestamps: false,
  }
);

Fritzbox.removeAttribute("id");

module.exports = Fritzbox;
