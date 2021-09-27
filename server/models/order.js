const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
    orderItems: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'OrderItem',
        required: true
    }],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    shippingAddress1: {
        type: String,
        required: true
    },
    shippingAddress2: {
        type: String,
        default: ''
    },
    city: {
        type: String,
        required: true
    },
    zip: {
        type: String,
        required: true
    },
    country: {
        type: String,
        default: ''
    },
    phone: {
        type: String,
        default: ''
    },
    totalPrice: {
        type: Number,
        required: true
    },
    dateOrder: {
        type: Date,
        default: Date.now
    }
})

orderSchema.virtual('id').get(function() {
    return this._id.toHexString();
})

orderSchema.set('toJSON', {
    virtuals: true,
})

const Order = mongoose.model('Order', orderSchema);
module.exports = Order;
