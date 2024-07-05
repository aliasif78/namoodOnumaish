import React, { useEffect } from 'react'
import { useAddCategoryMutation, useGetCategoriesQuery, useUpdateCategoryMutation, useDeleteCategoryMutation } from '../../redux/api/categoryApiSlice'
import { toast } from 'react-toastify'
import { useState } from 'react'
import { FaEdit, FaTrash, FaSave } from 'react-icons/fa'

const Categories = () => {
  const [addCategory] = useAddCategoryMutation()
  const [updateCategory] = useUpdateCategoryMutation()
  const [deleteCategory] = useDeleteCategoryMutation()
  const { data: categories } = useGetCategoriesQuery()

  const [name, setName] = useState('')
  const [editableName, setEditableName] = useState('')
  const [editableCategoryId, setEditableCategoryId] = useState('')

  const handleAddCategory = async (e) => {
    // Has no effect as form is not being used here
    e.preventDefault()

    if (!name) {
      toast.error("Please provide a name.")
      return
    }

    try {
      const res = await addCategory({ name }).unwrap()

      if (res.error) {
        toast.error(res.error)
        return
      }

      setName("")
      toast.success("Category added successfully.")
    }

    catch (error) {
      console.log(error)
      toast.error(error.data.message || error.message)
    }
  }

  const handleEdit = (category) => {
    setEditableCategoryId(category._id)
    setEditableName(category.name)
  }

  const handleDelete = async (category) => {
    if (window.confirm("Are you sure that you want to delete this category?")) {
      try {
        await deleteCategory(category._id)
        toast.success("Category deleted successfully.")
      }

      catch (error) {
        toast.error(error?.data?.message || error.message)
        console.error(error)
      }
    }
  }

  const handleSave = async (e, category) => {
    e.preventDefault()

    try {
      const updatedCategory = { ...category, name: editableName }
      const result = await updateCategory(updatedCategory).unwrap()

      if (result.error) {
        toast.error(result.error)
        return
      }

      setEditableName('')
      setEditableCategoryId('')

      toast.success('Category has been successfully updated.')
    }

    catch (error) {
      toast.error(error?.data?.message || error.message)
      console.error(error)
    }
  }

  return (
    <>
      <div className='flex flex-col gap-5 mt-[3rem] justify-center items-center'>
        <input type="text" value={name} onChange={e => setName(e.target.value)} className='w-[20rem] pl-3' />
        <button onClick={(e) => handleAddCategory(e)} onChange={e => setName(e.target.value)} className='bg-neutral-700 hover:bg-black rounded-md text-white px-4 py-2' >Add Category</button>

        <div className="flex flex-col gap-1">
          {categories && categories.map((category, i) => (
            <div key={category._id} className='flex flex-row gap-2 justify-left items-center'>
              <div>{i}.</div>

              {editableCategoryId !== category._id ? (
                <>
                  <div>{category.name}</div>
                  <FaEdit className='cursor-pointer text-cyan-700 ml-[0.5rem]' onClick={() => handleEdit(category)}></FaEdit>
                </>
              ) : (
                <>
                  <input type="text" value={editableName} onChange={e => setEditableName(e.target.value)} />
                  <FaSave className='cursor-pointer text-cyan-700 ml-[0.5rem]' onClick={(e) => handleSave(e, category)}></FaSave>
                </>
              )}

              <FaTrash className='cursor-pointer text-cyan-700' onClick={() => handleDelete(category)}></FaTrash>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default Categories