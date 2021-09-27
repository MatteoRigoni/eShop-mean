const Order = require('../models/order');
const OrderItem = require('../models/order-item');
const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

router.get(`/`, async (req, res) => {
    const orderList = await Order.find()
        .populate('user', 'name')
        .sort({ 'dateOrder': -1 });

    if (!orderList) {
        res.status(500).json({ success: false })
    }
    res.send(orderList);
})

router.get(`/:id`, async (req, res) => {
    if (!mongoose.isValidObjectId(req.params.id)) {
        res.status(400).json({ success: false, error: 'Invalid order id' });
    }

    const order = await Order.findById(req.params.id)
        .populate('user', 'name')
        .populate({
            path: 'orderItems',
            populate:
            {
                path: 'product',
                populate: 'category'
            }
        });

    if (!order) {
        return res.status(404).json({ success: false })
    }
    return res.send(order);
});

router.post('/', async (req, res) => {
    const orderItemsIds = Promise.all(req.body.orderItems.map(async orderItem => {
        let newOrderItem = new OrderItem({
            quantity: orderItem.quantity,
            product: orderItem.product
        })
        newOrderItem = await newOrderItem.save();
        return newOrderItem._id;
    }));

    const orderItemsIdsResolved = await orderItemsIds;

    const totalePrices = await Promise.all(orderItemsIdsResolved.map(async (orderItemId) => {
        const orderItem = await OrderItem.findById(orderItemId).populate('product');
        const totalPrice = orderItem.product.price * orderItem.quantity;
        return totalPrice;
    }))

    const totalPrice = totalePrices.reduce((a, b) => a + b, 0);

    let order = new Order({
        orderItems: orderItemsIdsResolved,
        shippingAddress1: req.body.shippingAddress1,
        shippingAddress2: req.body.shippingAddress2,
        city: req.body.city,
        zip: req.body.zip,
        country: req.body.country,
        phone: req.body.phone,
        status: req.body.status,
        totalPrice: totalPrice,
        user: req.body.user,
    });
    order = await order.save();

    if (!order) {
        return status(400).send({ success: false, error: 'Order cannot be created' });
    };

    return res.send(order);
});

router.put(`/:id`, async (req, res) => {
    if (!mongoose.isValidObjectId(req.params.id)) {
        res.status(400).json({ success: false, error: 'Invalid order id' });
    }

    const order = await Order.findByIdAndUpdate(
        req.params.id,
        {
            status: req.body.status
        },
        { new: true }
    );

    if (!order) {
        res.status(404).json({ success: false })
    }
    return res.status(200).send(order);
});

router.delete('/:id', (req, res) => {
    Order.findByIdAndRemove(req.params.id).then(async order => {
        if (order) {
            await order.orderItems.map(async orderItem => {
                await OrderItem.findByIdAndRemove(orderItem)
            })
            return res.status(200).json({ success: true, message: 'the order is deleted!' })
        } else {
            return res.status(404).json({ success: false, message: "order not found!" })
        }
    }).catch(err => {
        return res.status(500).json({ success: false, error: err })
    })
});

router.get('/get/totalsales', async (req, res) => {
    const totalSales = await Order.aggregate([
        { $group: { _id: null, totalsales: { $sum: '$totalPrice' } } }
    ])
    return res.send({ result: totalSales.pop().totalsales });
})

router.get('/get/count', async (req, res) => {
    const orderCount = await Order.countDocuments();

    if (!orderCount) {
        return res.status(500).json({ success: false })
    }
    return res.send({ result: orderCount });
});

router.get('/get/userorders/:userid', async (req, res) => {
    const orders = await Order.find({ user: req.params.userid })
        .populate({
            path: 'orderItems',
            populate:
            {
                path: 'product',
                populate: 'category'
            }
        })
        .sort({'dateOrder' : -1});

    if (!orders) {
        return res.status(500).json({ success: false })
    }
    return res.send({ result: orders });
});

module.exports = router;