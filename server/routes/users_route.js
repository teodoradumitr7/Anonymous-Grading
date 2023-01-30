const router = require('express').Router();
const { User } = require('../config/dbConfig');
const Joi = require('joi');
const passwordComplexity = require('joi-password-complexity');
const bcrypt = require('bcrypt');

//ruter pentru utilizatori

const validatePwd = (data) => {
    const schema = Joi.object({
        newPassword: passwordComplexity().required().label('Password')
    });
    return schema.validate(data);
};

//returneaza toti utilizatorii
router.get('/', async (req, res) => {
    try {
        const users = await User.findAll();
        return res.status(200).json(users);
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: 'Error occured trying to get all users '});
    }
});

//schimbare parola
router.put('/:uid', async (req, res) => {
    try {
        const { oldPassword, newPassword } = req.body;
        const { error } = validatePwd({ newPassword });
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }

        const user = await User.findByPk(req.params.uid);
        if (user && await bcrypt.compare(oldPassword, user.dataValues.password)) {
            password = await bcrypt.hash(newPassword, 10);
            user.password = password;
            await user.save();
            return res.status(200).json({ message: 'Password changed!' });
        }

        return res.status(400).json({ message: 'Old password is incorrect' });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: 'Error occured trying to change password' });
    }
});

//stergere user
router.delete('/:uid', async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findByPk(req.params.uid);
        if (user) {
            if (username !== user.dataValues.username) {
                return res.status(400).json({ message: 'Username is incorrect' });
            }
            if (!(await bcrypt.compare(password, user.dataValues.password))) {
                return res.status(400).json({ message: 'Confirmation password is incorrect' });
            }
            await user.destroy();
            return res.status(200).json({ message: 'User deleted!' });
        }
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: 'Error occured trying to delete user' });
    }
});

module.exports = router;