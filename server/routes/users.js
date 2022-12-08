const express = require("express");
const router = express.Router();
require("dotenv").config();
const jwt = require("jsonwebtoken");
// const { salt } = require("../seed");


const {
   
    // ACCESS_TOKEN_SECRET,
    AUTH0_SECRET,
    AUTH0_BASE_URL,
    AUTH0_CLIENT_ID,
    AUTH0_ISSUER_BASE_URL,
   
} = process.env;

const config = {
    authRequired: false,
    auth0Logout: true,
    secret: AUTH0_SECRET,
    //  ACCESS_TOKEN_SECRET,
    baseURL: AUTH0_BASE_URL,
    clientID: AUTH0_CLIENT_ID,
    issuerBaseURL: AUTH0_ISSUER_BASE_URL,
 

  };


  
// This is for the Databases
const {User, Entry} = require("../models/index")
const {sequelize} = require("../db");

// Requiring BCrypt and Creating Salt Object for Hashing Passwords. 
const bcrypt = require("bcrypt");
// const { Sequelize } = require("sequelize");
const SALT_COUNT = 4;
let salt = bcrypt.genSaltSync(SALT_COUNT);


//Include the Middleware
// This is important for when we include information in the body of the request or the "req.body". 
router.use(express.json());
router.use(express.urlencoded({extended:true}));
const { auth } = require('express-openid-connect');





let setUser = async (req, res, next) => {
    try{
        //The first thing we will do is we will get the "auth"
        const auth = req.header("Authorization");
        if(!auth){
            console.log("You are not a registered user, please register or login");
            next();
        }else{
            console.log( `Welcome: ", ${username}`);
            const [, token] = auth.split(" ");
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
    let users = await User.findAll();
    res.send(users);
} catch (error) {
    next(error);
  }
});



// GET one user
router.get("/:id", async (req, res, next) => {
  
  try{
    const user = await User.findByPk(req.params.id, {
        include: [{model: Entry}]
    });
    if(!user) {
        res.status(404);
        next();
      } else {
        res.send(user);
      }
    } catch (error) {
      next(error);
    }
  });

router.post("/register", async (req, res, next) => {
    // The user should be authenticated

    // First thing we want to do is get the data passed into the body
    try {
      const {username, password, email} = req.body;
console.log(req.body);
    console.log("The username is: ", username);
    console.log("The password is: ", password);
    console.log("The email is: ", email);

    // What we want to do now is, we want to create a user based on the data passed in, except, we want to hash the password as it goes into the database!
    // We can accomplish that using Bcrypt: 
    hashedPW = bcrypt.hashSync(password, salt);
    console.log("hashedPW: ", hashedPW);

    // Now we can create the user with these references: 
    let createdUser = await User.create({username, password: hashedPW, email});

   


    const token = jwt.sign({id: createdUser.id, username: createdUser.username}, ACCESS_TOKEN_SECRET);



    res.send({message: "User Successfully Registered", token})
    } catch  (error) {
      console.log(error);
      next(error);
    }

});

router.post("/login", setUser, async (req, res) => {
    const {username, password} = req.body;
    const user = await User.findOne({where: {username}});
   
    const isMatch = await bcrypt.compareSync(password, user.password);
    console.log(password)
    console.log(user.password)
    if(isMatch){
        // Successful Login
        // Deconstructing the User Object by its properties/fields.
        const {id, username} = user

        const token = jwt.sign({
            id, 
            username
        }, AUTH0_SECRET);

        res.send({message: "Successful Login", token});
    }else{
        // Not successful Login
        res.send("User Not Found");
    }
})
// // Update a single user by id
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
  
  
  
  
//   // Delete a single user by id
  router.delete("/:id", async (req, res, next) => {
    try {
      await User.destroy({
        where : {id : req.params.id}
      });
      const user = await User.findAll()
      res.send(user);
    } catch (error) {
      next(error);
    } 
  })

// // auth router attaches /login, /logout, and /callback routes to the baseURL
router.use(auth(config));

// req.isAuthenticated is provided from the auth router
router.get('/', (req, res) => {
  res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
});

// // Restrictive or Private Route
router.get("/users/entry", (req, res) => {
    let isAuthenticated = req.oidc.isAuthenticated();
    res.send(isAuthenticated ? "<h1>Welcome to our travel journal, please create your blog entry</h1>" : "<h1>Please make sure to authenticate in order to view our products</h1>")
});
// seed();
module.exports = router;