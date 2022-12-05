const Sequelize = require("sequelize");
const { database } = require("../db");


const User = database.define('user', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
},
  username: {
    type: Sequelize.STRING,
    allowNull: false
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    defaultValue: "FirstName LastName" // DEFAULT 
  },

  password: {
    type:Sequelize.STRING,
    foreignKey: true,
    allowNull: false,
  },

  email: {
    type: Sequelize.STRING,
    allowNull: false
  },

  admin: {
    type: Sequelize.BOOLEAN,
    allowNull: false
  },

}, {
    timestamps: false
});


module.exports = { User };