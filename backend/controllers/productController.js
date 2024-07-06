import Product from "../models/productModel.js";
import asyncHandler from "../middlewares/asyncHandler.js";
import { Error } from "mongoose";
import mongoose from "mongoose";

const addProduct = asyncHandler(async (req, res) => {
    const { name, image, category, categoryName, description, price, inStock } = req.body

    try {
        // Check if the Product already exists
        const productExists = await Product.findOne({ name })

        if (productExists) {
            res.json({ error: "A product with the same name already exists." })
            return
        }

        const result = new Product({ name, image, category, categoryName, description, price, inStock })
        await result.save()
        res.json(result)
    }

    catch (err) {
        console.error(err)
        res.status(400).json({ error: err.message })
    }
})

const getAllProducts = asyncHandler(async (req, res) => {
    try {
        const products = await Product.find({})

        if (products.length == 0) {
            res.json([])
            return
        }

        return res.json(products)
    }

    catch (err) {
        console.error(err)
        return res.status(500).json({ error: err.message })
    }
})

const deleteProduct = asyncHandler(async (req, res) => {
    const id = req.params.id

    try {
        const product = await Product.findById({ _id: id })

        if (!product)
            return res.status(404).json({ error: "Product does not exist" })

        await Product.deleteOne({ _id: id })
        return res.json(product)
    }

    catch (err) {
        console.log(err)
        return res.status(500).json({ error: "Internal server error." })
    }
})

const updateProduct = asyncHandler(async (req, res) => {
    const id = req.params.id

    try {
        const product = await Product.findById({ _id: id })

        if (!product)
            return res.status(404).json({ error: "Product not found." })

        const { name, image, description, price, inStock, category, categoryName } = req.body

        product.name = name
        product.image = image
        product.description = description
        product.price = price
        product.inStock = inStock
        product.category = category
        product.categoryName = categoryName

        const updatedProduct = await product.save()
        return res.json(updatedProduct)
    }

    catch (err) {
        console.error(err)
        return res.status(500).json({ error: "Internal server error." })
    }
})

const getProductDetails = asyncHandler(async (req, res) => {
    const id = req.params.id

    try {
        const product = await Product.findById({ _id: id })

        if (!product)
            return res.status(404).json({ error: "Product does not exist." })

        return res.json(product)
    }

    catch (err) {
        console.error(err)
        return res.status(500).json({ error: "Internal server error." })
    }
})

const addReview = asyncHandler(async (req, res) => {
    const id = req.params.id
    const review = req.body


    try {
        const product = await Product.findById({ _id: id })

        if (!product)
            return res.status(404).json({ error: "Product does not exist." })

        // Check if the user has already reviewed the product
        if (product.reviews.length !== 0) {
            const alreadyReviewed = product.reviews.find(r => r.user.toString() === review.user.toString())

            if (alreadyReviewed)
                return res.status(400).json({ message: "You have already reviewed this product." })
        }

        // Add the review
        product.reviews.push(review)

        // Change product rating
        if (product.numReviews === 0)
            product.rating = review.rating
        else
            product.rating = product.reviews.reduce((acc, r) => acc + r.rating, 0) / (product.numReviews + 1)

        // Update the number of Reviews
        product.numReviews = product.reviews.length

        // Save changes
        const updatedProduct = await product.save()
        return res.status(201).json(updatedProduct)
    }

    catch (err) {
        console.error(err)
        return res.status(500).json({ error: "Internal server error." })
    }
})

export { addProduct, getAllProducts, deleteProduct, updateProduct, getProductDetails, addReview }