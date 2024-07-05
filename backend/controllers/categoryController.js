// Defining the User Functions
import Category from "../models/categoryModel.js";
import asyncHandler from "../middlewares/asyncHandler.js";
import { Error } from "mongoose";

const addCategory = asyncHandler(async (req, res) => {
    try {
        const category = req.body

        // Has the name been provided?
        if (!category.name) {
            return res.json({ error: "Please provide a name for the category." })
        }

        // Does the category already exist?
        const existingCategory = await Category.findOne(category)

        if (existingCategory) {
            return res.json({ error: "Provided category already exists" })
        }

        // Now add the category
        const newCategory = await new Category(category).save()
        return res.json(newCategory)
    }

    catch (error) {
        console.log(error)
        return res.status(400).json(error)
    }
})

const getCategories = asyncHandler(async (req, res) => {
    try {
        const categories = await Category.find({})
        return res.json(categories)
    }

    catch (error) {
        console.log(error)
        return res.status(400).json(error.message)
    }
})

const updateCategory = asyncHandler(async (req, res) => {
    try {
        const category = req.body

        if (!category.name) {
            return res.json({ error: "Please provide a name for the category." })
        }

        const existingCategory = await Category.findOne({ _id: req.params.id })

        if (!existingCategory) {
            return res.status(404).json({ error: "Category does not exist." })
        }

        existingCategory.name = category.name
        const result = await existingCategory.save()

        if (result.error)
            return res.json(result.error)

        return res.json(existingCategory)
    }

    catch (error) {
        console.log(error)
        return res.status(500).json({ error: "Internal server error." })
    }
})

const deleteCategory = asyncHandler(async (req, res) => {

    const id = req.params.id
    const categoryToBeDeleted = await Category.findById({ _id: id })

    if (categoryToBeDeleted) {
        await Category.deleteOne({ _id: id })
        return res.json({ message: "Category deleted successfully." })
    }

    else {
        res.status(404)
        throw new Error("Category does not exist.")
    }
})

export { addCategory, getCategories, updateCategory, deleteCategory }