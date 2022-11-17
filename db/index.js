
const {Entry} = require('./Entry');
const {User} = require('./User');
const {sequelize, Sequelize} = require('./db');

Entry.belongsTo(User, {foreignKey: 'ownerId'}); // Entry table, there will be an ownerId <- FK
User.hasMany(Entry);

module.exports = {
    Entry,
    User,
    sequelize,
    Sequelize
};