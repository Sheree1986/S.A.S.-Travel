const {sequelize, Sequelize} = require('../db')



const Entry = sequelize.define("entry", {
  
    title: {
      type: Sequelize.STRING,
      allowNull: false
    },
    content: {
      type: Sequelize.TEXT,
      // allowNull: false
    },
    location: {
       type: Sequelize.TEXT,
       allowNull: false
    },
    image: {

        type: Sequelize.STRING,
        allowNull: false
      },  

    }, {
      timestamps: false
  
    
  });

  
  Entry.findByUser = function(search) {
    return Entry.findAll({
      include: {
        model: User,
        where: {
          username: {
            [Sequelize.Op.substring]: search
          }
        }
      }
    })
  }
  
  const User = sequelize.define("user", {
    username: {
      type: Sequelize.STRING,
      allowNull: false
 
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false
 
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false
 
    },
    email: {
      type: Sequelize.STRING,
      isEmail: true,
      allowNull: false
    },  
    // admin: {
    //   type: Sequelize.BOOLEAN,
    //   allowNull: false
    // },
  
  }, {
      timestamps: false
  });




  //This adds methods to 'Entry', such as '.setAuthor'. It also creates a foreign key attribute on the Page table pointing ot the User table
Entry.belongsTo(User, { as: "author" });
User.hasMany(Entry, {foreignKey: 'authorId'});



module.exports = {
    db: sequelize,
    User,
    Entry,
    sequelize,
    Sequelize
  
}


