const bcrypt = require('bcrypt')
const tableUser = require('./models');

const users = async (req, res) => {
    const dataFound = await tableUser.findAll({ attributes: { exclude: ['password'] } });
    res.status(200).send(dataFound);
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const userFound = await tableUser.findAll(
            { attributes: ['email', 'password'] },
            { where: { email: email } }
        );

        !emailExist ?? res.status(404).send('No existe una cuenta vinculada con el correo electrónico');

        bcrypt.compare(password, userFound.password, (err, result) => {
            err ?? console.log(`Error comparando las contraseñas: ${err}`);
            result ? console.log('Las contraseñas coinciden') : console.log('No coinciden las contraseñas');
        });
    } catch (error) {
        console.log(`error: ${error}`);
    }
};

const register = async (req, res) => {
    try {
        const { firstname, lastname, email, username, password } = req.body;
        let passwordInput = password;
        const passwordHashed = await bcrypt.hash(passwordInput, 10);
        console.log(passwordHashed);
        const userCreated = await tableUser.create({
            firstname: firstname,
            lastname: lastname,
            email: email,
            username: username,
            password: passwordHashed
        });
        
        if (userCreated) res.status(201).send(`usuario creado ;D`); 
    } catch (error) {
        console.log(`error: ${error}`);
    }
};

module.exports = {users, register, login};