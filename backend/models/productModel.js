import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema

const reviewSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    rating: {
        type: Number,
        required: true
    },

    comment: {
        type: String,
        required: true
    },

    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    }
}, { timestamps: true })

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true,
        maxlength: 32,
        unique: true
    },

    image: {
        type: String,
        required: true
    },

    category: {
        type: ObjectId,
        required: true,
        ref: "Category"
    },

    categoryName: {
        type: String
    },

    reviews: [reviewSchema],

    rating: {
        type: Number,
        required: false,
        default: 0
    },

    numReviews: {
        type: Number,
        required: false,
        default: 0
    },

    description: {
        type: String,
        required: true,
        unique: false
    },

    price: {
        type: Number,
        required: true,
        default: 0
    },

    inStock: {
        type: Number,
        required: true,
        default: 0
    },

    quantityBought: {
        type: Number,
        required: false,
        default: 1
    },

    discountPercent: {
        type: Number,
        required: false,
        default: 0
    },

    discountAmount: {
        type: Number,
        required: false,
        default: 0
    },
}, { timestamps: true })

const Product = mongoose.model('Product', productSchema)
export default Product