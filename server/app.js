// load environment variables from .env or elsewhere
require('dotenv').config();
const express = require('express');
const app = express();
const morgan = require('morgan');
const path = require('path');
const cors = require('cors');
const register = require("./routes/register");
const login = require("./routes/login");
const entries = require("./routes/entries");
const users = require("./routes/users");
// const { auth } = require('express-openid-connect');


// //Express route for entries & users
// app.use("/entries", entriesRouter);
// app.use("/users", usersRouter);

//Allow CORS requests
app.use(cors());
// logging middleware
app.use(morgan('dev'));
// parsing middleware for form input data & json
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// serve up static files (e.g. html and css files)
app.use(express.static(path.join(__dirname, '../dist')));

// api router
// app.use('/api', require('./routes'));
app.use('/api/login', login);
app.use('/api/register', register);
app.use('/api/entries', entries);
app.use('/api/users', users);


app.get("/", (req, res) => {
  res.send("Welcome our travel Journal..");
});

app.get("/entries", (req, res) => {
  res.send(entries);
});

// 404 handler
app.use((req, res) => {
  res.status(404).send({error: '404 - Not Found', message: 'No route found for the requested URL'});
});

// error handling middleware
app.use((error, req, res, next) => {
  console.error('SERVER ERROR: ', error);
  if(res.statusCode < 400) res.status(500);
  res.send({error: error.message, name: error.name, message: error.message, table: error.table});
});

module.exports = app;