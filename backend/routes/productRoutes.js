import express from "express";
import { authenticate, authorizeAdmin } from "../middlewares/authMiddleware.js"
import { addProduct, getAllProducts, updateProduct, deleteProduct } from "../controllers/productController.js";

const router = express.Router()

router.route('/')
    .post(authenticate, authorizeAdmin, addProduct)
    .get(authenticate, authorizeAdmin, getAllProducts)

router.route('/:id')
    .put(authenticate, authorizeAdmin, updateProduct)
    .delete(authenticate, authorizeAdmin, deleteProduct)

export default router