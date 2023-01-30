const router = require('express').Router();
const { User } = require('../config/dbConfig');
const Joi = require('joi');
const passwordComplexity = require('joi-password-complexity');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

//ruter pentru inregistrare-sign up
const validateRegistration = (data) => {
    const schema = Joi.object({
        name: Joi.string().required(),
        surname: Joi.string().required(),
        username: Joi.string().required(),
        password: passwordComplexity().required().label('Password'),
        type:Joi.number()
    });
    return schema.validate(data);
};

router.post('/', async (req, res) => {
    try {
        // folosind joi se valideaza inputul daca este corect introdus
        const { error } = validateRegistration(req.body);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }

        // se preiau datele
        const {name,surname, username, password ,type} = req.body;

        // se verifica daca exista userul, daca da se afiseaza mesaj de eroare
        const oldUser = (await User.findAll({ where: { username: username.toLowerCase() }}))[0];
        if (oldUser) {
            return res.status(409).json({ message: 'User Already Exists. Please Log In' });
        }

        // criptare parola
        encryptedPassword = await bcrypt.hash(password, 10);

        // creare token pt jwt
        const token = jwt.sign(
            { user_id: username },
            process.env.TOKEN_KEY,
            { expiresIn: "7d" }
        );

        // creare user
        const user = await User.create({
            "name":name,
            "surname":surname,
            "username": username.toLowerCase(),
            "password": encryptedPassword,
            "type":type,
            "token": token
        });
        //afisare pe ecran user creat
        return res.status(201).json({ message: `User Created!`, user: user });
    } catch (err) {
        console.warn(`Internal Server Error: ${err}`);
        return res.status(500).json({ message: `Internal Server Error: ${err}` });
    }
});

module.exports = router;