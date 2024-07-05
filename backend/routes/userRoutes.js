import express from "express";
import { addUser, loginUser, logoutUser, getUserProfile, getAllUsers, updateUserProfile, updateUserById, deleteUserById } from "../controllers/userController.js";
import { authenticate, authorizeAdmin } from "../middlewares/authMiddleware.js"

const router = express.Router()

router.route('/')
    .post(addUser)
    .get(authenticate, authorizeAdmin, getAllUsers)

router.route('/login')
    .post(loginUser)

router.route('/logout')
    .post(logoutUser)

router.route('/:id')
    .put(authenticate, authorizeAdmin, updateUserById)
    .delete(authenticate, authorizeAdmin, deleteUserById)

router.route('/profile/:id')
    .get(authenticate, getUserProfile)

export default router