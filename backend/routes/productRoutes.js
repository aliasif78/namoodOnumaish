import express from "express";
import { authenticate, authorizeAdmin } from "../middlewares/authMiddleware.js"
import checkId from "../middlewares/checkId.js";
import { addProduct, getAllProducts, updateProduct, deleteProduct, getProductDetails, addReview } from "../controllers/productController.js";

const router = express.Router()

router.route('/')
    .post(authenticate, authorizeAdmin, addProduct)
    .get(getAllProducts)

router.route('/:id')
    .put(authenticate, authorizeAdmin, updateProduct)
    .delete(authenticate, authorizeAdmin, deleteProduct)
    .get(getProductDetails)

router.route('/reviews/:id')
    .put(authenticate, checkId, addReview)

export default router