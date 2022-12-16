const bcrypt = require("bcrypt");
const { salt} = require("../seed");
const { User } = require("../models/index");
const express = require("express");
const generateAuthToken = require("../auth/generateAuthToken");
const router = express.Router();

router.post("/", async (req, res, next) => {

  // The user should be authenticated

// First thing we want to do is get the data passed into the body
    try {
      const {username, name, password, email} = req.body;


// What we want to do now is, we want to create a user based on the data passed in, except, we want to hash the password as it goes into the database!
// We can accomplish that using Bcrypt: 
    hashedPW = bcrypt.hashSync(password, salt);
    console.log("hashedPW: ", hashedPW);

// Now we can create the user with these references: 
    let createdUser = await User.create({username, name, password: hashedPW, email});
    

   
const token = generateAuthToken(createdUser);

  res.status(200).send({message: "User Successfully Registered", token});


    } catch  (error) {
      console.log(error);
      next(error);
    }

});



module.exports = router;