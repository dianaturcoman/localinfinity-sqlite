const connection = require("../config/db");
const Sequelize = require("sequelize");

const Misc = connection.define(
  "misc",
  {
    Field: {
      type: Sequelize.TEXT,
      allowNull: false,
    },
    Value: {
      type: Sequelize.TEXT,
      allowNull: false,
    },
  },
  {
    connection,
    freezeTableName: true,
    tableName: "misc",
    timestamps: false,
  }
);

Misc.removeAttribute("id");

module.exports = Misc;
