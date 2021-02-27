const jwt = require("jsonwebtoken");

const setTokenToCookie = (response, payload) => {
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
  response.cookie("jwt_token", token, {
    maxAge: process.env.JWT_COOKE_MAX_AGE,
    httpOnly: true,
  });
};

module.exports = {
  setTokenToCookie,
};
