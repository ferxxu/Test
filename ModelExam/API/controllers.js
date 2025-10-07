const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const tableUser = require("./models");
const { text } = require("body-parser");
require("dotenv").config();

const users = async (req, res) => {
  const dataFound = await tableUser.findAll({
    attributes: { exclude: ["password"] },
  });
  res.status(200).send(dataFound);
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userFound = await tableUser.findAll({
      where: { email: email },
    });
    if (userFound != "") {
      let passwordComparation = await bcrypt.compare(
        password,
        userFound[0].dataValues.password
      );
      passwordComparation;
      if (!passwordComparation) res.status(401).send();
      const token = jwt.sign(
        {
          user_id:  userFound[0].dataValues.id,
          user_username:  userFound[0].dataValues.username,
        },
        process.env.SECRET_KEY,
        {
          expiresIn: "5m",
          algorithm: "HS256",
        }
      );
      if (passwordComparation) res.json({ status: 200, message: "Credenciales válidas", tokenCreated: token });
    } else res.status(404).send();
  } catch (err) {
    console.error(`algo pasó: ${err}`);
  }
};

const register = async (req, res) => {
  try {
    const { firstname, lastname, email, username, password } = req.body;
    let passwordInput = password;
    const passwordHashed = await bcrypt.hash(passwordInput, 10);
    const userCreated = await tableUser.create({
      firstname: firstname,
      lastname: lastname,
      email: email,
      username: username,
      password: passwordHashed,
    });
    if (userCreated) res.status(201).send();
  } catch (error) {
    console.log(`error: ${error}`);
  }
};

const userLoged = async (req, res) => {
  const tokenData = req.user;
  const dataFound = await tableUser.findByPk(tokenData.user_id);
  if (dataFound) res.status(200).send(dataFound);
}

module.exports = { users, register, login, userLoged };
