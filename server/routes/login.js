const bcrypt = require("bcrypt");
const { User } = require("../models/index");
const express = require("express");
const generateAuthToken = require("../auth/generateAuthToken");
const router = express.Router();

router.post("/", async (req, res) => {
 

    const {username, password} = req.body;
    const regUser = await User.findOne({where: {username}});
   
    const isMatch = await bcrypt.compareSync(password, regUser.password);
    console.log(password)
    console.log(regUser.password)
    
    if(isMatch){

    const token = generateAuthToken(isMatch);
    res.status(200).send({message: "Successful Login", token});

    } else {
 return res.status(400).send("Invalid username or password...");

} 
}
);



module.exports = router;