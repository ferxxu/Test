const jwt = require("jsonwebtoken");
require("dotenv").config();

function validateUser(req, res, next) {
  const tokenAuth = req.headers["authorization"];

  if (!tokenAuth)
    return res.status(403).json({ message: "Token no proporcionado" });
  try {
    const tokenDecifrado = jwt.verify(tokenAuth, process.env.SECRET_KEY);
    req.user = tokenDecifrado;
    next();
  } catch (error) {
    console.error(`El token es invalido: ${error}`);
  }
}

module.exports = { validateUser };
