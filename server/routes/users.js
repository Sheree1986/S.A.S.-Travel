const express = require("express");
const router = express.Router();
//import controller from controllers folder to be able to use the logic defined there
const { createUser, getUsers,deleteUser } = require("../controllers/userController");

//GET, POST
router.route("/").post(createUser).get(getUsers);
router.route("/:id").delete(deleteUser);

module.exports = router;
