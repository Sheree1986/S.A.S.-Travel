const { Entry } = require("./Entry");
const { User } = require("./User");
const { Password } = require("./Password");

const { database } = require("../db");





User.hasMany(Entry);
Entry.belongsTo(User);

User.hasOne(Password, {foreignKey: 'ownersId',
as: 'ownersId',
onDelete: 'CASCADE',});
Password.belongsTo(User);



module.exports = {
    User,
    Entry,
    Password,
    database
}


