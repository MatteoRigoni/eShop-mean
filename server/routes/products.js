const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const Category = require('../models/category');
const router = express.Router();
const Product = require('../models/product');

const FILE_TYPE_ALLOWED = {
    'image/png': 'png',
    'image/jpeg': 'jpeg',
    'image/jpg': 'jpg'
};
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const isValid = FILE_TYPE_ALLOWED[file.mimetype];
        let uploadError = new Error('Invalid image type');
        if (isValid) {
            uploadError = null
        }
        cb(uploadError, 'public/uploads')
    },
    filename: function (req, file, cb) {
        const filename = file.originalname.split(' ').join('-');
        const extension = FILE_TYPE_ALLOWED[file.mimetype];
        cb(null, `${filename.split('.')[0]}-${Date.now()}.${extension}`)
    }
})

const uploadOptions = multer({ storage: storage })

router.get(`/`, async (req, res) => {
    let products = [];

    // api/v1/products?categories=1,2,3
    let filterCategory = {};
    if (req.query.categories) {
        filterCategory = { category: req.query.categories.split(',') };
    }

    try {
        products = await Product.find(filterCategory).populate('category');
    } catch (err) {
        res.status(500).json({ success: false, error: err });
    }

    if (!products) {
        res.status(500).json({ success: false });
    }

    res.send(products);
});

router.post(`/`, uploadOptions.single('image'), async (req, res) => {
    const category = await Category.findById(req.body.category);
    if (!category) return res.status(404).json({ success: false, error: 'Category not found' });

    const file = req.file;
    if (!file) return res.status(404).json({ success: false, error: 'No image in the request' });

    const filename = req.file.filename;
    const basePath = `${req.protocol}://${req.get('host')}/public/uploads/`;

    const product = new Product({
        name: req.body.name,
        description: req.body.description,
        richDescription: req.body.richDescription,
        image: `${basePath}${filename}`,
        brand: req.body.brand,
        price: req.body.price,
        category: req.body.category,
        countInStock: req.body.countInStock,
        rating: req.body.rating,
        numReviews: req.body.numReviews,
        isFeatured: req.body.isFeatured,
    });
    product.save()
        .then((createdProduct) => {
            res.status(201).json(createdProduct)
        })
        .catch(err => {
            res.status(500).json({
                error: err,
                success: false
            })
        })
});

router.get(`/:id`, async (req, res) => {
    if (!mongoose.isValidObjectId(req.params.id)) {
        res.status(400).json({ success: false, error: 'Invalid product id' });
    }

    const product = await Product.findById(
        req.params.id
    ).populate('category');

    if (!product) {
        return res.status(404).json({ success: false })
    }
    return res.send(product);
});

router.put(`/:id`, uploadOptions.single('image'), async (req, res) => {
    if (!mongoose.isValidObjectId(req.params.id)) {
        res.status(400).json({ success: false, error: 'Invalid product id' });
    }

    const category = await Category.findById(req.body.category);
    if (!category) return res.status(404).json({ success: false, error: 'Category not found' });

    const existingProduct = await Product.findById(req.params.id);
    if (!existingProduct) return res.status(404).json({ success: false, error: 'Product not found' });

    const file = req.file;
    let imagePath;

    if (file) {
        const filename = req.file.filename;
        const basePath = `${req.protocol}://${req.get('host')}/public/uploads/`;
        imagePath = `${basePath}${file.filename}`;
    } else {
        imagePath = existingProduct.image;
    }

    const product = await Product.findByIdAndUpdate(
        req.params.id,
        {
            name: req.body.name,
            description: req.body.description,
            richDescription: req.body.richDescription,
            image: imagePath,
            brand: req.body.brand,
            price: req.body.price,
            category: req.body.category,
            countInStock: req.body.countInStock,
            rating: req.body.rating,
            numReviews: req.body.numReviews,
            isFeatured: req.body.isFeatured
        },
        { new: true }
    );

    if (!product) {
        res.status(404).json({ success: false })
    }
    return res.status(200).send(product);
});

router.delete('/:id', (req, res) => {
    if (!mongoose.isValidObjectId(req.params.id)) {
        res.status(400).json({ success: false, error: 'Invalid product id' });
    }

    Product.findByIdAndRemove(req.params.id)
        .then((product) => {
            if (product) {
                return res.status(200).json({ success: true });
            } else {
                return res.status(404).json({ success: false });
            }
        })
        .catch(err => {
            return res.status(500).json({ success: false, error: err });
        })
});

router.get('/get/count', async (req, res) => {
    const productCount = await Product.countDocuments();

    if (!productCount) {
        return res.status(500).json({ success: false })
    }
    return res.send({ result: productCount });
});

router.get('/get/featured/:count?', async (req, res) => {
    const count = req.params.count ? req.params.count : 0;
    const products = await Product
        .find({ isFeatured: true })
        .limit(Number(count))
        .populate('category');

    if (!products) {
        return res.status(500).json({ success: false })
    }
    return res.send({result:products});
});

router.put('/gallery-images/:id', uploadOptions.array('images', 10), async (req, res) => {
    if (!mongoose.isValidObjectId(req.params.id)) {
        res.status(400).json({ success: false, error: 'Invalid product id' });
    }

    const basePath = `${req.protocol}://${req.get('host')}/public/uploads/`;

    let imagesPaths = [];
    const files = req.files;
    if (files) {
        files.map(file => {
            imagesPaths.push(`${basePath}${file.filename}`);
        })
    }

    const product = await Product.findByIdAndUpdate(
        req.params.id,
        {
            images: imagesPaths
        },
        { new: true }
    );

    if (!product) {
        res.status(500).json({ success: false });
    }

    res.send(product);
});

module.exports = router;