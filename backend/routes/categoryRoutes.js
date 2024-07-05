import express from "express";
import { authenticate, authorizeAdmin } from "../middlewares/authMiddleware.js"
import { addCategory, getCategories, updateCategory, deleteCategory, getCategoryById } from "../controllers/categoryController.js";

const router = express.Router()

router.route('/')
    .post(authenticate, authorizeAdmin, addCategory)
    .get(getCategories)

router.route('/:id')
    .get(getCategoryById)
    .put(authenticate, authorizeAdmin, updateCategory)
    .delete(authenticate, authorizeAdmin, deleteCategory)

export default router