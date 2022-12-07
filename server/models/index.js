
const {Sequelize} = require('sequelize')
const {sequelize} = require('../db')



const Entry = sequelize.define("entry", {
  
    title: {
      type: Sequelize.STRING,
      allowNull: false
    },
    slug: {
      type: Sequelize.STRING,
      allowNull: false,
      //since we are searching, editing, deleting by slug, these need to be unique
      unique: true
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
  
  Entry.beforeValidate((entry) => {
    /*
     * Generate slug
     */
    if (!entry.slug) {
      entry.slug = entry.title.replace(/\s/g, "_").replace(/\W/g, "").toLowerCase();
    }
  });
  
  Entry.findByTag = function(search) {
    return Entry.findAll({
      include: {
        model: Tag,
        where: {
          name: {
            [Sequelize.Op.substring]: search
          }
        }
      }
    })
  }
  
 Entry.prototype.findSimilar = function(tags) {
    return Entry.findAll({
      where: {
        id: {
          [Sequelize.Op.ne]: this.id
        }
      },
      include: {
        model: Tag,
        where: {
          name: {
            [Sequelize.Op.in]: tags
          }
        }
      }
    });
  }
  const User = sequelize.define("user", {
    username: {
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


  const Tag = sequelize.define("tag", {
    name: {
      type: Sequelize.STRING,
      allowNull: false
    }


});

  //This adds methods to 'Entry', such as '.setAuthor'. It also creates a foreign key attribute on the Page table pointing ot the User table
Entry.belongsTo(User, { as: "author" });
User.hasMany(Entry, {foreignKey: 'authorId'});

Entry.belongsToMany(Tag, {through: 'entry_tags'});
Tag.belongsToMany(Entry, {through: 'entry_tags'});


module.exports = {
    db: sequelize,
    User,
    Entry,
    Tag
}


