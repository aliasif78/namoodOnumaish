// Defining the User Functions
import User from "../models/userModel.js";
import asyncHandler from "../middlewares/asyncHandler.js";
import bcrypt from "bcryptjs";
import generateToken from "../utils/createToken.js";
import { Error } from "mongoose";

// Using asyncHandler to catch any errors
const addUser = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body

    // Presence Checks
    if (!username || !email || !password) {
        throw new Error("Missing Information.")
        return
    }

    // Email Existance Check
    const userExists = await User.findOne({ email })

    if (userExists) {
        res.status(400).json({ message: "Email is already in use." });
        return
    }

    // Finally add the User after encrypting the Password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)
    const newUser = new User({ username, email, password: hashedPassword })

    try {
        // Save the User to the Database
        await newUser.save()

        // Generate a Cookie
        generateToken(res, newUser._id)

        // Send a Successful Response Status
        res.status(201).json({ _id: newUser._id, username: newUser.username, email: newUser.email, isAdmin: newUser.isAdmin })
    }

    // Throw an Error if anything unexpected happens
    catch (error) {
        res.status(400)
        throw new Error("Invalid information provided")
    }
})

const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body

    if (!email || !password) {
        throw new Error("Missing information.")
        return
    }

    // Email check
    const userExists = await User.findOne({ email })

    if (!userExists) {
        throw new Error("User does not exist.")
        return
    }

    // User exists, check Password
    const isPasswordValid = await bcrypt.compare(password, userExists.password)

    // Password is valid, Login
    if (isPasswordValid) {
        // Generate a Cookie
        generateToken(res, userExists._id)

        // Send a Successful Response Status
        res.status(201).json({ _id: userExists._id, username: userExists.username, email: userExists.email, isAdmin: userExists.isAdmin })

        // Allow User to be Logged In now
        return
    }

    else {
        throw new Error("Incorrect password.")
        return
    }
})

const logoutUser = asyncHandler(async (req, res) => {
    // Remove the Cookie
    res.cookie('jwt', '', {
        httpOnly: true,
        expires: new Date(0)
    })

    res.status(200).json({ message: "Logout successful." })
})

const getUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id)

    if (user) {
        res.json({
            _id: user._id,
            username: user.username,
            email: user.email
        })
    }

    else {
        res.status(404)
        throw new Error('User not found.')
    }
})

const updateUserProfile = asyncHandler(async (req, res) => {
    const { username, email, password, id } = req.body
    const user = await User.findOne({ id })

    if (user) {
        user.username = username || user.username
        user.email = email || user.email

        // Encrypt the Password
        if (password) {
            const salt = await bcrypt.genSalt(10)
            const hashedPassword = await bcrypt.hash(req.body.password, salt)
            user.password = hashedPassword
        }

        const updatedUser = await user.save()

        res.json({
            _id: updatedUser._id,
            username: updatedUser.username,
            email: updatedUser.email,
            password: updatedUser.password,
            isAdmin: updatedUser.isAdmin
        })
    }

    else {
        res.status(404)
        throw new Error('User not found.')
    }
})

const updateUserById = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id).select('-password')

    if (user) {
        user.username = req.body.username || user.username

        const updatedUser = await user.save()
        res.json({ updatedUser })
    }

    else {
        res.status(404)
        throw new Error("User not found.")
    }
})

const getAllUsers = asyncHandler(async (req, res) => {
    // Get all Users
    const users = await User.find({})
    res.json(users)
})

const deleteUserById = asyncHandler(async (req, res) => {
    const userToBeDeleted = await User.findById(req.params.id)

    if (userToBeDeleted) {
        if (userToBeDeleted.isAdmin) {
            res.status(400)
            throw new Error("An admin cannot be deleted.")
        }

        await User.deleteOne({ _id: userToBeDeleted._id })
        res.json({ message: "User removed succefully." })
    }

    else {
        res.status(404)
        throw new Error("User not found.")
    }
})

export { addUser, loginUser, logoutUser, getUserProfile, updateUserProfile, getAllUsers, updateUserById, deleteUserById }