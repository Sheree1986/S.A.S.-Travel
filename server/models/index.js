const { Entry } = require("./Entry");
const { User } = require("./User");
const { Password } = require("./Password");


User.hasMany(Entry);
Entry.belongsTo(User);

// User.hasOne(Password);
// Password.belongsTo(User);



module.exports = {
    User,
    Entry,
    // Password
}


