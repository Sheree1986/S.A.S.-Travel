require('dotenv').config('.env');
const cors = require('cors');
const express = require('express');
const app = express();
const morgan = require('morgan');
const { PORT = 3000 } = process.env;
const bcrypt = require('bcrypt');

// TODO - require express-openid-connect and destructure auth from it

const { User , Entry } = require('./db');


const { auth } = require('express-openid-connect');

const {
  AUTH0_BASE_ISSUER,
  AUTH0_BASE_URL,
  AUTH0_CLIENT_ID,
  AUTH0_SECRET
  } = process.env;
  
const config = {
  authRequired: false,
  auth0Logout: true,
  secret: AUTH0_SECRET,
  baseURL: AUTH0_BASE_URL,
  clientID: AUTH0_CLIENT_ID,
  issuerBaseURL: AUTH0_BASE_ISSUER,
};





// middleware
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended:true}));
// auth router attaches /login, /logout, and /callback routes to the baseURL
app.use(auth(config));

/* *********** YOUR CODE HERE *********** */
// follow the module instructions: destructure config environment variables from process.env
// follow the docs:
  // define the config object
  // attach Auth0 OIDC auth router
  // create a GET / route handler that sends back Logged in or Logged out

// req.isAuthenticated is provided from the auth router

// app.use(async (req, res, next) => {
// const [ User ] = await User.findOrCreate({
// where: {name: 'Batman'}

// })
// next(),
// console.log(user)
// })

// POST /register
// TODO - takes req.body of {username, password} and creates a new user with the hashed password
app.post("/register", async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const salt = 10;
    const hashedPw = await bcrypt.hash(password, salt);
    const registerUser = await User.create({ username, password: hashedPw });

    res.send(`successfully created user ${username}`);
  } catch (error) {
    console.error(error);
    next(error);
  }
});
// POST /login
// TODO - takes req.body of {username, password}, finds user by username, and compares the password with the hashed version from the DB
app.post("/login", async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ where: { username } });
    if (user) {
      const passwordMatch = await bcrypt.compare(password, user.password);

      if (passwordMatch) {
        res.send(`successfully logged in user ${username}`);
      } else {
        res.send("incorrect username or password");
      }
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
});

app.get('/', (req, res) => {
  res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
});

app.get('/entries', async (req, res, next) => {
  try {
    const entries = await Entry.findAll();
    res.send(entries);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// error handling middleware
app.use((error, req, res, next) => {
  console.error('SERVER ERROR: ', error);
  if(res.statusCode < 400) res.status(500);
  res.send({error: error.message, name: error.name, message: error.message});
});

app.listen(PORT, () => {
  console.log(`Entries are ready at http://localhost:${PORT}`);
});
