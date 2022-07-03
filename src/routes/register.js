const express = require('express');
const { body, validationResult } = require('express-validator');
const router = express.Router();
const User = require('../model/User');
const bcrypt = require('bcryptjs');

//ROUTE: 1 Sign Up..........
router.get('/', (req, res) => res.send('<h1>Register get</h1>'));
router.post(
    '/',
    [
        // body('name', 'Enter a valid name').isLength({ min: 3 }),
        body('email', 'Enter a valid email').isEmail(),
        // body('password', 'Enter a valid password').isLength({ min: 5 })
    ],
    async (req, res) => {
        try {

            //if there are errors return errors and the bad request........
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ result: errors.array()[0].msg });
            }

            //Check weather a user with this email exists already........
            const user = await User.findOne({ email: req.body.email });
            if (user) {
                return res.status(400).send({ result: 'Sorry a user with this email exists already' });
            }

            const securePassword = await bcrypt.hash(req.body.password, 10);

            const newUser = new User({
                name: req.body.name,
                email: req.body.email,
                password: securePassword,
            });

            const savedUser = await newUser.save();
            console.log(savedUser);
            res.status(201).json({result: 'success'});
        } catch (error) {
            console.log(error);
            res.status(500).send({result: 'Internal server error'});
        }
    }
);

module.exports = router;