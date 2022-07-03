const express = require('express');
const { body, validationResult } = require('express-validator');
const User = require('../model/User');
const router = express.Router();
const bcrypt = require('bcryptjs');


//ROUTE: 2 Sign In...........
router.get('/', (req, res) => res.send('<h1>Sign in get</h1>'));
router.post(
    '/',
    [
        body('email', 'Enter a valid email').isEmail(),
        body('password', 'Enter a valid password').isLength({ min: 5 })
    ],
    async (req, res) => {
        try {

            //if there are errors return errors and the bad request........
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ result: errors.array()[0].msg });
            }

            const user = await User.findOne({ email: req.body.email });
            if (!user) {
                return res.status(400).send({ result: 'Please enter correct credentials' });
            }

            const isPasswordMatch = await bcrypt.compare(req.body.password, user.password);
            if (!isPasswordMatch) {
                return res.status(400).send({ result: 'Please enter correct credentials' });
            }

            console.log(user, { isVerified: true });
            res.status(200).json({ result: 'success' });
        } catch (error) {
            console.log(error);
            res.status(500).send({result: 'Internal server error'});
        }
    }
);

module.exports = router;