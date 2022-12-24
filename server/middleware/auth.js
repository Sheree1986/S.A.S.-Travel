// const jwt = require("jsonwebtoken");

// const auth = (req, res, next) => {
//   const token = req.header("Authorization");
  
//   if (!token)
//     return res.status(401).send("Access denied. Not authenticated...");
//   try {
//     const accessToken = process.env.ACCESS_TOKEN_SECRET;
//     const decoded = jwt.verify(token, accessToken);

//     req.user = decoded;
//     next();
//   } catch (err) {
//     res.status(400).send("Invalid auth token...");
//   }
// };


// module.exports = { auth};