const Category = require('../models/category');
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

router.get(`/`, async (req, res) => {
    const categoryList = await Category.find();

    if (!categoryList) {
        return res.status(500).json({ success: false })
    }
    return res.status(200).send(categoryList);
});

router.post('/', async (req, res) => {
    let category = new Category({
        name: req.body.name,
        icon: req.body.icon,
        color: req.body.color
    });
    category = await category.save();

    if (!category) {
        return status(400).send({ success: false, error: 'category cannot be created' });
    };

    return res.send(category);
});

router.delete('/:id', (req, res) => {
    if (!mongoose.isValidObjectId(req.params.id)) {
        res.status(400).json({ success: false, error: 'Invalid category id' });
    }

    Category.findByIdAndRemove(req.params.id)
        .then((category) => {
            if (category) {
                return res.status(200).json({ success: true });
            } else {
                return res.status(404).json({ success: false });
            }
        })
        .catch(err => {
            return res.status(500).json({ success: false, error: err });
        })
});

router.get(`/:id`, async (req, res) => {
    if (!mongoose.isValidObjectId(req.params.id)) {
        res.status(400).json({ success: false, error: 'Invalid category id' });
    }

    const category = await Category.findById(
        req.params.id
    );

    if (!category) {
        return res.status(404).json({ success: false })
    }
    return res.send(category);
});

router.put(`/:id`, async (req, res) => {
    if (!mongoose.isValidObjectId(req.params.id)) {
        res.status(400).json({ success: false, error: 'Invalid category id' });
    }

    const category = await Category.findByIdAndUpdate(
        req.params.id,
        {
            name: req.body.name,
            icon: req.body.icon,
            color: req.body.color
        },
        { new: true }
    );
    
    if (!category) {
        res.status(404).json({ success: false })
    }
    return res.status(200).send(category);

});

module.exports = router;