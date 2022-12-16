const jwt = require("jsonwebtoken");

const generateAuthToken = (users) => {
  const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;

  const token = jwt.sign(
    {
      id: users.id,
      name: users.name,
      email: users.email,
      isAdmin: users.isAdmin,
    },
    ACCESS_TOKEN_SECRET
  );

  return token;
};

module.exports = generateAuthToken;