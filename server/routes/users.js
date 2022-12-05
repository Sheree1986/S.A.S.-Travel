const usersRouter = express.Router();

const express = require("express");
const app = express();
require("dotenv").config();
const jwt = require("jsonwebtoken");
const { auth } = require('express-openid-connect');

const {
    PORT, 
    ACCESS_TOKEN_SECRET,
    AUTH0_SECRET,
    AUTH0_BASE_URL,
    AUTH0_CLIENT_ID,
    AUTH0_ISSUER_BASE_URL,
} = process.env;

const config = {
    authRequired: false,
    auth0Logout: true,
    secret: AUTH0_SECRET,
    token: ACCESS_TOKEN_SECRET,
    baseURL: AUTH0_BASE_URL,
    clientID: AUTH0_CLIENT_ID,
    issuerBaseURL: AUTH0_ISSUER_BASE_URL
  };
  
// This is for the Databases
const {User} = require("../models/User.js");
const {sequelize} = require("../db.js");

// Requiring BCrypt and Creating Salt Object for Hashing Passwords. 
const bcrypt = require("bcrypt");
const salt = bcrypt.genSaltSync(4);

//Include the Middleware
// This is important for when we include information in the body of the request or the "req.body". 
app.use(express.json());
app.use(express.urlencoded({extended:true}));



let setUser = async (req, res, next) => {
    try{
        //The first thing we will do is we will get the "auth"
        const auth = req.header("Authorization");
        if(!auth){
            console.log("I'm in the if");
            next();
        }else{
            console.log("I'm in the else");
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
// auth router attaches /login, /logout, and /callback routes to the baseURL
app.use(auth(config));

app.get("/", (req, res) => {
    res.send("Success!!!!!!");
})
//GET all users
app.get("/users", async (req, res) => {
    let users = await User.findAll();
    res.send(users);
})


//GET one user
entriesRouter.get("/:id", async (req, res) => {
    const users = await User.findByPk(req.params.id);
   res.json(users);
  
  })
  

app.post("/users/register", async (req, res) => {
    // The user should be authenticated

    // First thing we want to do is get the data passed into the body
    const {username, password} = req.body;

    console.log("The username is: ", username);
    console.log("The password is: ", password);

    // What we want to do now is, we want to create a user based on the data passed in, except, we want to hash the password as it goes into the database!
    // We can accomplish that using Bcrypt: 
    hashedPW = bcrypt.hashSync(password, salt);

    // Now we can create the user with these references: 
    let createdUser = await User.create({username, password: hashedPW});

    console.log("hashedPW: ", hashedPW);


    const token = jwt.sign({id: createdUser.id, username: createdUser.username}, ACCESS_TOKEN_SECRET);



    res.send({message: "User Successfully Registered", token})
    

})

app.post("/users/login", setUser, async (req, res) => {
    const {username, password} = req.body;
    const user = await User.findOne({where: {username}});
    const isMatch = bcrypt.compareSync(password, user.password);
    if(isMatch){
        // Successful Login
        // Deconstructing the User Object by its properties/fields.
        const {id, username} = user

        const token = jwt.sign({
            id, 
            username
        }, ACCESS_TOKEN_SECRET);

        res.send({message: "Successful Login", token});
    }else{
        // Not successful Login
        res.send("User Not Found");
    }
})
// // Update a single user by id
// usersRouter.put("/:id", async (req, res, next) => {
//     try {
//       await User.update(req.body, {
//         where: { id: req.params.id },
//       });
//       let putUsers = await User.findAll();
//       res.json(putUsers);
//     } catch (error) {
//       next(error);
//     }
//   });
  
  
  
  
//   // Delete a single user by id
//   usersRouter.delete("/:id", async (req, res, next) => {
//     try {
//       await User.destroy({
//         where : {id : req.params.id}
//       });
//       const user = await User.findAll()
//       res.send(user);
//     } catch (error) {
//       next(error);
//     } 
//   })

// auth router attaches /login, /logout, and /callback routes to the baseURL
app.use(auth(config));

// req.isAuthenticated is provided from the auth router
app.get('/', (req, res) => {
  res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
});

// Restrictive or Private Route
app.get("/users/entry", (req, res) => {
    let isAuthenticated = req.oidc.isAuthenticated();
    res.send(isAuthenticated ? "<h1>Welcome to our travel journal, please create your blog entry</h1>" : "<h1>Please make sure to authenticate in order to view our products</h1>")
});
module.exports = usersRouter, PORT;
