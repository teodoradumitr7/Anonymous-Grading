const router = require('express').Router();
const { User } = require('../config/dbConfig');
const Joi = require('joi');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

//ruter pentru log in
//bazat pe username si parola
//genereaza post->pentru a valida credentialele utilizatorilor
const validateLogin = (data) => {
    const schema = Joi.object({
        username: Joi.string().required().label('Username'),
        password: Joi.string().required().label('Password')
    });
    return schema.validate(data);
};

router.post('/', async (req, res) => {
    try {
        const { error } = validateLogin(req.body);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }

        const { username, password } = req.body;

      //verifica daca userul exista in baza pentru a putea ulterior compara parola
        const user = (await User.findAll({ where: { username: username.toLowerCase() }}))[0];
        if (user) {
            //decriptare parola
            if (await bcrypt.compare(password, user.dataValues.password)) {
                const token = jwt.sign(
                    { user_id: username },
                    process.env.TOKEN_KEY,
                    { expiresIn: "7d" }
                );
                user.token = token;
                return res.status(200).json(user);
            }
            return res.status(400).json({ message: 'Invalid Credentials' });
        }

        return res.status(400).json({ message: "User Doesn't Exists" });
    } catch (err) {
        console.warn(`Internal Server Error: ${err}`);
        return res.status(500).json({ message: `Internal Server Error: ${err}` });
    }
});

module.exports = router;