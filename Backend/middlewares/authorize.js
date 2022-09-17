const { verify } = require("jsonwebtoken");
const User = require("../models/User");

const validateToken = (req, res, next) => {
  const accessToken = req.header("accessToken");

  if (!accessToken) return res.json({ error: "User not logged in!" });

  try {
    const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET_KEY);
    req.user = decodedToken;
    if (decodedToken) {
      return next();
    }
  } catch (err) {
    return res.json({ error: err });
  }
};

module.exports = { validateToken };