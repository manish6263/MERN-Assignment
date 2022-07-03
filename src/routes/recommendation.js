const express = require('express');
const { body, validationResult } = require('express-validator');
const Recommendation = require('../model/Recommendation');
const router = express.Router();

router.post(
    '/',
    [
        body('name').isLength({ min: 3 }),
        body('email', 'Enter a valid email').isEmail()
    ],
    async (req, res) => {

        try {

            //if there are error return bad request and the errors......
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ result: errors.array()[0].msg });
            }

            const newRecommendation = new Recommendation({
                id: req.body.id,
                name: req.body.name,
                email: req.body.email,
                company: req.body.company,
                designation: req.body.designation,
                recommendationMessage: req.body.recommendationMessage
            });

            const saveRecommendation = await newRecommendation.save();
            console.log(saveRecommendation);
            res.send({ result: true });

        } catch (error) {
            console.log(error);
            res.status(500).send({ result: 'Internal server error' });
        }
    }
);

router.get(
    '/',
    async (req, res) => {
        try {
            const recommendations = await Recommendation.find();
            res.send({ recommendations: recommendations, isSuccessfull: true });
            // console.log(recommendations.length);
        } catch (error) {
            console.log(error);
            res.status(500).send({ result: 'Internal server error', isSuccessfull: false });
        }

    }
);

router.get(
    '/:id',
    async (req, res) => {
        try {
            const recommendation = await Recommendation.findOne({id: req.params.id});
            res.send({ recommendation: recommendation, isSuccessfull: true });
            // console.log(recommendations.length);
        } catch (error) {
            console.log(error);
            res.status(500).send({ result: 'Internal server error', isSuccessfull: false });
        }

    }
);

router.put(
    '/:id',
    [
        body('name').isLength({ min: 3 }),
        body('email', 'Enter a valid email').isEmail()
    ],
    async (req, res) => {

        try {

            //if there are error return bad request and the errors......
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ result: errors.array()[0].msg });
            }

            let recommendation = await Recommendation.findOne({ id: req.params.id });
            console.log(recommendation);
            if (!recommendation) {
                return res.status(401).send({ result: 'recommendation does not exist' });
            }

            const newRecommendation = {
                id: req.body.id,
                name: req.body.name,
                email: req.body.email,
                company: req.body.company,
                designation: req.body.designation,
                recommendationMessage: req.body.recommendationMessage
            };

            recommendation = await Recommendation.findOneAndUpdate(
                { id: req.params.id },
                { $set: newRecommendation },
                { new: true }
            );
            res.send({ result: true });

        } catch (error) {
            console.log(error);
            res.status(500).send({ result: 'Internal server error' });
        }
    }
);

router.delete(
    '/:id',
    async (req, res) => {
        try {
            const id = req.params.id;
            console.log(id);
            let recommendation = await Recommendation.findOne({ id: id.toString() });

            if (!recommendation) {
                res.status(401).send({ isSuccessfull: false, result: 'There are some problem' });
            }

            recommendation = await Recommendation.findOneAndDelete({ id: id.toString() });
            // console.log(recommendation);
            res.send({ isSuccessfull: true });
        } catch (error) {
            console.log(error);
            res.status(500).send({ result: 'Internal server error', isSuccessfull: false });
        }

    }
);


module.exports = router;