import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema

const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },

    orderItems: [{
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'Product'
        },

        productName: {
            type: String,
            required: true
        },

        productQuantity: {
            type: Number,
            required: true
        },

        productPrice: {
            type: Number,
            required: true
        },

        productImage: {
            type: String,
            required: true
        }
    }],

    shippingDetails: {
        name: {
            type: String,
            required: true
        },

        email: {
            type: String,
            required: true
        },

        phoneNumber: {
            type: Number,
            required: true
        },

        city: {
            type: String,
            required: true
        },

        postalCode: {
            type: Number,
            required: true
        },

        deliveryAddress: {
            type: String,
            required: true
        },

        paymentMethod: {
            type: String,
            required: true
        }
    },

    isShipped: {
        type: Boolean,
        required: false,
        default: false
    },

    isPaid: {
        type: Boolean,
        required: false,
        default: false
    },

    isDelivered: {
        type: Boolean,
        required: false,
        default: false
    },

    itemsPrice: {
        type: Number,
        required: true
    },

    shippingPrice: {
        type: Number,
        required: true
    },

    totalPrice: {
        type: Number,
        required: true
    }
}, { timestamps: true })

const Order = mongoose.model('Order', orderSchema)
export default Order