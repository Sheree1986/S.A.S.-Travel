const express = require("express");
const router = express.Router();


// different model routers
router.use('/entries', require('./entries'));
router.use('/users', require('./users'));

module.exports = router;