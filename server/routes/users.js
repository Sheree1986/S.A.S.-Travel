const express = require("express");
const router = express.Router();
require("dotenv").config(".env");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { salt} = require("../seed");
const {User, Entry} = require("../models/index")
// const { auth } = require('express-openid-connect');


// This is a JS object that connect our app to auth service.
// Object Destructuring 
const {
    ACCESS_TOKEN_SECRET,
    // AUTH0_SECRET,
    // AUTH0_BASE_URL,
    // AUTH0_CLIENT_ID,
    // AUTH0_ISSUER_BASE_URL
   
} = process.env;

// const config = {
//     authRequired: false,
//     auth0Logout: true,
//     secret: AUTH0_SECRET,
//     baseURL: AUTH0_BASE_URL,
//     clientID: AUTH0_CLIENT_ID,
//     issuerBaseURL: AUTH0_ISSUER_BASE_URL
//   };

// auth router attaches /login, /logout, and /callback routes to the baseURL
// 1. localhost:3000/api/users/login
// 2. localhost:3000/api/users/logout
// 3. localhost:3000/api/users/callback
// router.use(auth(config));
  `
  // // req.isAuthenticated is provided from the auth router
  // router.get('/', (req, res) => {
  //   res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
  // });

  // // // Restrictive or Private Route
  // router.get("/users/entry", (req, res) => {
  //     let isAuthenticated = req.oidc.isAuthenticated();
  //     res.send(isAuthenticated ? "<h1>Welcome to our travel journal, please create your blog entry</h1>" : "<h1>Please make sure to authenticate in order to view our products</h1>")
  // });`
  



//Include the Middleware
// This is important for when we include information in the body of the request or the "req.body". 
router.use(express.json());
router.use(express.urlencoded({extended:true}));


let authUser = async (req, res, next) => {

  // TODO can put the boolean isAdmin in this 
    try{
//The first thing we will do is we will get the "auth"
        const auth = req.header("Authorization");
        if(!auth){
            console.log("You are not a registered user, please register or login");
            next();
        }else{
            console.log("Welcome: you are now logged in");
            const [, token] = auth.split(" ");
// array deconstruction 
// to finish up tier 4
            console.log("Token: ", token)
            const user = jwt.verify(token, ACCESS_TOKEN_SECRET);
            req.user = user;
            next();
        }
    }catch(err){
        console.error(err)
        next(err);
    }
}



//GET all users
router.get("/", async (req, res, next) => {
  try {
    let entries = await User.findAll();
    res.send(entries);
} catch (error) {
    next(error);
  }
});



// GET one user
router.get("/:id", async (req, res, next) => {
  
  try{
    const entries = await User.findByPk(req.params.id, {
        include: [{model: Entry}]
    });
    if(!entries) {
        res.status(404);
        next();
      } else {
        res.send(entries);
      }
    } catch (error) {
      next(error);
    }
  });

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
  

router.post("/register", async (req, res, next) => {
// The user should be authenticated

// First thing we want to do is get the data passed into the body
    try {
      const {username, name, password, email, admin} = req.body;
console.log(req.body);


// What we want to do now is, we want to create a user based on the data passed in, except, we want to hash the password as it goes into the database!
// We can accomplish that using Bcrypt: 
    hashedPW = bcrypt.hashSync(password, salt);
    console.log("hashedPW: ", hashedPW);

// Now we can create the user with these references: 
    let createdUser = await User.create({username, name, password: hashedPW, email, admin});

   


    const token = jwt.sign({id: createdUser.id, username: createdUser.username}, ACCESS_TOKEN_SECRET);


    // const {username, name, password, email, admin} = req.body;
    // // console.log(req.body);
    res.send({message: "User Successfully Registered", token})
    } catch  (error) {
      console.log(error);
      next(error);
    }

});

router.post("/login", authUser, async (req, res) => {
    const {username, password} = req.body;
    const regUser = await User.findOne({where: {username}});
   
    const isMatch = await bcrypt.compareSync(password, regUser.password);
    console.log(password)
    console.log(regUser.password)
    if(isMatch){
// Successful Login
// Deconstructing the User Object by its properties/fields.
        const {id, username} = regUser;

        let payload = {
          id, username
        }

        const token = jwt.sign({
            payload,
        }, ACCESS_TOKEN_SECRET);

        res.send({message: "Successful Login", token});
    }else{
// Not successful Login
      res.send("Please enter the correct password to log into your account");
    }
})
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
      await User.destroy({
        where : {id : req.params.id}
      });
      const entries = await User.findByPk(req.params.id);
      const deleteUsers = await entries.destroy();
      res.send(deleteUsers);
    } catch (error) {
      next(error);
    } 
  })





// seed();
module.exports = router;