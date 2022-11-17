const {sequelize} = require('./db');
const seed = require('./seedFn');

seed()
  .then(() => {
    console.log('Seeding success. Please register and complete your first journal entry');
  })
  .catch(err => {
    console.error(err);
  })
  .finally(() => {
    sequelize.close();
  });
  
