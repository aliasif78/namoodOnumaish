import express from "express";
import { authenticate, authorizeAdmin } from "../middlewares/authMiddleware.js"
import { addCategory, getCategories, updateCategory, deleteCategory } from "../controllers/categoryController.js";

const router = express.Router()

router.route('/')
    .post(authenticate, authorizeAdmin, addCategory)
    .get(authenticate, authorizeAdmin, getCategories)

router.route('/:id')
    .put(authenticate, authorizeAdmin, updateCategory)
    .delete(authenticate, authorizeAdmin, deleteCategory)

export default router