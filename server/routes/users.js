const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const router = express.Router();
const User = require('../models/user');

router.get(`/`, async (req, res) => {
    const userList = await User.find().select('-passwordHash');;

    if (!userList) {
        res.status(500).json({ success: false })
    }
    res.send(userList);
})

router.get(`/:id`, async (req, res) => {
    if (!mongoose.isValidObjectId(req.params.id)) {
        res.status(400).json({ success: false, error: 'Invalid user id' });
    }

    const user = await User.findById(id).select('-passwordHash');

    if (!user) {
        res.status(500).json({ success: false })
    }
    res.send(user);
})

router.post('/', async (req, res) => {
    let user = new User({
        name: req.body.name,
        email: req.body.email,
        passwordHash: bcrypt.hashSync(req.body.password, 10),
        isAdmin: req.body.isAdmin,
        phone: req.body.phone,
        apartment: req.body.apartment,
        zip: req.body.zip,
        street: req.body.street,
        city: req.body.city,
        country: req.body.country
    });
    user = await user.save();

    if (!user) {
        return status(400).send({ success: false, error: 'user cannot be created' });
    };

    return res.send(user);
});

router.put(`/:id`, async (req, res) => {
    if (!mongoose.isValidObjectId(req.params.id)) {
        res.status(400).json({ success: false, error: 'Invalid user id' });
    }

    const userExists = await User.findById(req.params.id);
    let newPassword;
    if (req.body.password) {
        newPassword = bcrypt.hashSync(req.body.password, 10);
    } else {
        newPassword = userExists.passwordHash;
    }

    const user = await User.findByIdAndUpdate(
        req.params.id,
        {
            name: req.body.name,
            email: req.body.email,
            passwordHash: newPassword,
            isAdmin: req.body.isAdmin,
            phone: req.body.phone,
            apartment: req.body.apartment,
            zip: req.body.zip,
            street: req.body.street,
            city: req.body.city,
            country: req.body.country
        },
        { new: true }
    );

    if (!user) {
        return res.status(404).json({ success: false })
    }
    return res.status(200).send(user);
});

router.post('/login', async (req, res) => {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
        return res.status(400).json({ success: false, error: 'User not found' })
    }

    if (user && bcrypt.compareSync(req.body.password, user.passwordHash)) {
        const token = jwt.sign(
            {
                userId: user.id,
                isAdmin: user.isAdmin
            }
            , process.env.JWT_SECRET
            , { expiresIn: '1d' });
        return res.status(200).send({ user: user.email, token: token });
    } else {
        return res.status(400).json({ success: false, error: 'Password is wrong' })
    }
});

router.get('/get/count', async (req, res) => {
    const userCount = await User.countDocuments();

    if (!userCount) {
        return res.status(500).json({ success: false })
    }
    return res.send({ result: userCount });
});

router.delete('/:id', (req, res) => {
    if (!mongoose.isValidObjectId(req.params.id)) {
        res.status(400).json({ success: false, error: 'Invalid user id' });
    }

    Category.findByIdAndRemove(req.params.id)
        .then((user) => {
            if (user) {
                return res.status(200).json({ success: true });
            } else {
                return res.status(404).json({ success: false });
            }
        })
        .catch(err => {
            return res.status(500).json({ success: false, error: err });
        })
});

module.exports = router;