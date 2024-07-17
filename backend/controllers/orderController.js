import asyncHandler from "../middlewares/asyncHandler.js";
import { Error } from "mongoose";
import mongoose from "mongoose";
import Order from "../models/orderModel.js";
import Product from "../models/productModel.js"

const placeOrder = asyncHandler(async (req, res) => {
    try {
        const { user, orderItems, shippingDetails, itemsPrice, shippingPrice, totalPrice } = req.body

        // Verify if all items are still in the database
        // const allProducts = await Product.find()
        // let exists = false

        // for (let i = 0; i < orderItems.length; i++) {
        //     for (let j = 0; j < allProducts.length; j++)
        //         if (orderItems[i].productId.toString() === allProducts[j]._id.toString()) {
        //             exists = true
        //             break
        //         }

        //     if (!exists)
        //         throw new Error(`${orderItems[i].name} not found.`)

        //     exists = false
        // }

        const order = new Order({
            user,
            orderItems,
            shippingDetails,
            itemsPrice,
            shippingPrice,
            totalPrice
        })

        const products = await Product.find({})

        for (const i of orderItems)
            await Product.updateOne({_id: i.productId}, {$inc: {unitsSold: i.productQuantity}})

        const placedOrder = await order.save()
        return res.status(200).json(placedOrder)
    }

    catch (err) {
        console.error(err)
        return res.status(500).json({ error: "Internal server error." })
    }
})

const deleteOrder = asyncHandler(async (req, res) => {
    try {
        const id = req.params.id
        const order = await Order.find({ _id: id })

        if (!order) {
            console.error("Order not found.")
            return res.status(404).json({ error: "Order not found." })
        }

        const deletedOrder = await Order.deleteOne({ _id: id })
        return res.status(200).json(deletedOrder)
    }

    catch (err) {
        console.error(err)
        res.status(500).json({ error: "Internal server error." })
    }
})

const getAllOrders = asyncHandler(async (req, res) => {
    try {
        const orders = await Order.find({})
        return res.status(200).json(orders)
    }

    catch (err) {
        console.error(err)
        res.status(500).json({ error: "Internal server error." })
    }
})

const getOrderById = asyncHandler(async (req, res) => {
    const id = req.params.id

    try {
        const order = await Order.findById({ _id: id })

        if (!order)
            return res.status(404).json({ error: "Order does not exist." })

        return res.json(order)
    }

    catch (err) {
        console.error(err)
        return res.status(500).json({ error: "Internal server error." })
    }
})

const updateOrder = asyncHandler(async (req, res) => {
    console.log("id: ", req.params)

    try {
        const { isShipped, isPaid, isDelivered } = req.body
        const orignalOrder = await Order.findById({ _id: req.params.id })

        if (!orignalOrder) {
            console.error("Order not found.")
            return res.status(404).json({ error: "Order not found." })
        }

        orignalOrder.isShipped = isShipped
        orignalOrder.isPaid = isPaid
        orignalOrder.isDelivered = isDelivered

        const updatedOrder = await orignalOrder.save()
        return res.status(200).json(updatedOrder)
    }

    catch (err) {
        console.log(err)
        return res.status(500).json({ error: "Internal server error." })
    }
})

export { placeOrder, deleteOrder, updateOrder, getAllOrders, getOrderById }