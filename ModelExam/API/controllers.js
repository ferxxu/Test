const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt");
const tableUser = require("./models");
const { text } = require('body-parser');
require('dotenv').config();

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
    
    if (userFound != ''){
    let passwordComparation = await bcrypt.compare(
      password,
      userFound[0].dataValues.password
    );
    passwordComparation;
    if (!passwordComparation) res.status(401).send();
    if (passwordComparation) res.status(200).send();

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
    const token = jwt.sign(
      {
      user_id: userCreated['dataValues'].id, 
      user_username: userCreated['dataValues'].username,
    },
    process.env.SECRET_KEY, 
    {
      expiresIn: "5m",
      algorithm: "HS256"
    });
    res.json({status: 201, message:'User created', tokenCreated: token});
  } catch (error) {
    console.log(`error: ${error}`);
  }
};

module.exports = { users, register, login };
