const express = require("express");
const router = express.Router();
require("dotenv").config(".env");
const {User, Entry} = require("../models/index")
const { auth, isUser, isAdmin } = require("../middleware/auth");


//GET all users
router.get("/",isAdmin,auth,  async (req, res, next) => {
  try {
    let entries = await User.findAll();
    res.send(entries);
} catch (error) {
    next(error);
  }
});



// GET one user
router.get("/:id", async (req, res, next) => {
  
    const entries = await User.findByPk(req.params.id, {
        include: [{model: Entry}]
    });
    if(!entries) {
        res.status(404);
        next();
      } else {
        res.send(entries);
      }
    } );

  // this endpoint GET all entries posted by a user (user id in req.params) 
//https://sequelize.org/docs/v6/advanced-association-concepts/eager-loading/
router.get("/:id/entries", async (req, res, next) => {

  const postedEntries = await User.findByPk(req.params.id, {
      include: {
      model: Entry,
      required: true
}})


  res.send(postedEntries);
  
  })

 
  
  router.put("/:id/entries/:entriesId", async (req, res, next) => {

try {const users = await User.findByPk(req.params.id);
     const entries = await Entry.findByPk(req.params.entriesId);

  users.addEntry(entries);
  const userEntries = await users.getEntries();
  res.send(userEntries);

} catch (error) {
  next(error);
}
});

  
router.post("/:id/entries", async (req, res, next) => {

  try {const users = await User.findByPk(req.params.id);
       const entries = await Entry.findByPk(req.params.entriesId);
  
    users.addEntry(entries);
    const userEntries = await users.getEntries();
    res.send(userEntries);
  
  } catch (error) {
    next(error);
  }
  });
  

// Update a single user by id
router.put("/:id", async (req, res, next) => {
    try {
      await User.update(req.body, {
        where: { id: req.params.id },
      });
      let putUsers = await User.findAll();
      res.json(putUsers);
    } catch (error) {
      next(error);
    }
  });
  
  
  
  
// Delete a single user by id
  router.delete("/:id", async (req, res, next) => {
    try {
      // const entries = await User.destroy({
      //   where : {id : req.params.id}
      // });
      const entries = await User.findByPk(req.params.id);
      const deleteUsers = await entries.destroy();
      res.status(200).send({message: "User successfully deleted", deleteUsers});
      console.log("user")
    } catch (error) {
      res.status(404).send("User not found")
      next(error);
    } 
  })


module.exports = router;