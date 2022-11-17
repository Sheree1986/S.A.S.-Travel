const {sequelize} = require('./db');
const {User} = require('./');
const {Entry} = require('./');
const {users, entries} = require('./seedData');

const seed = async () => {
  try {
    await sequelize.sync({ force: true }); // recreate db
    const createdUsers = await User.bulkCreate(users);
    const createdEntries = await Entry.bulkCreate(entries);
    for(let i=0; i<createdEntries.length; ++i){
        let entry = createdEntries[i];
        const userId = createdUsers[i % 3].id;
        await entry.setUser(userId);
    }
  } catch (error) {
    console.error(error);
  }
};

module.exports = seed;