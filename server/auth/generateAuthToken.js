const jwt = require("jsonwebtoken");

const generateAuthToken = (users, res) => {
  const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;

  const token = jwt.sign(
    {
      id: users.id,
      role: users.role,
      name: users.name,
      email: users.email,
  
    },
    ACCESS_TOKEN_SECRET, 
  );

 let results = {
  username: users.name,
  role: users.role,
  token: `Bearer ${token}`,
 };
 return results
};

module.exports = generateAuthToken;