

const {users, entries}  = require('./seedData.js');
const {sequelize} = require('./db');
const { User, Entry } = require('./models');
const bcrypt = require("bcrypt");
;

const SALT_COUNT = 4;
let salt = bcrypt.genSaltSync(SALT_COUNT);

let seed = async () => {

    try { 
        // drop and recreate tables per model definitions
        await sequelize.sync({force:true});
        // users.map(user => user.password)
        
        for (let i = 0; i < users.length; i ++) {
            users[i].password = bcrypt.hashSync(users[i].password, salt)
            console.log(users[i].password);
        }
        
        // // insert data
             // insert data
             await Promise.all(users.map(user => User.create(user)));
             const createdEntries = await Promise.all(entries.map(entry => Entry.create(entry)));
             console.log(createdEntries)
        // let entryEntries = await Entry.bulkCreate(entries);
        // let userEntries = await User.bulkCreate(users);

        // let firstEntry = await entryEntries[0];
        // let secondUser = await userEntries[0];


        // console.log("Test 2: ", firstEntry);
        // console.log("Test 2: ", secondUser);
        // await Promise.all(users.map(user => User.create(user)));
        // const createdEntries = await Promise.all(
        // const createdTags = await Promise.all(tags.map(tag => Tag.create(tag)));
        
        //       // associate data
        // createdEntries[0].addTags([createdTags[1]]);
        // createdEntries[1].addTags([createdTags[0]]);
        // createdEntries[2].addTags([createdTags[1], createdTags[2]]);
      
      


        console.log("db populated!");
    } catch (error) {
        console.error(error);
 }
}
seed();

module.exports = {
    seed,
    salt,
}