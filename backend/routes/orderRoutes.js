import express from "express";
import { authenticate, authorizeAdmin } from "../middlewares/authMiddleware.js"
import checkId from "../middlewares/checkId.js";
import { placeOrder, getAllOrders, deleteOrder, getOrderById, updateOrder } from "../controllers/orderController.js";

const router = express.Router()

router.route('/')
    .get(authenticate, authorizeAdmin, getAllOrders)

router.route('/placeorder')
    .post(authenticate, placeOrder)

router.route('/:id')
    .get(authenticate, authorizeAdmin, getOrderById)
    .put(authenticate, authorizeAdmin, updateOrder)
    .delete(authenticate, authorizeAdmin, deleteOrder)

export default router