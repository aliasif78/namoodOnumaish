import React, { useEffect } from 'react'
import { useAddCategoryMutation, useGetCategoriesQuery, useUpdateCategoryMutation, useDeleteCategoryMutation } from '../../redux/api/categoryApiSlice'
import { toast } from 'react-toastify'
import { useState } from 'react'
import { RiSortAlphabetAsc, RiSortAlphabetDesc } from "react-icons/ri";

const Categories = () => {
  const [addCategory] = useAddCategoryMutation()
  const [updateCategory] = useUpdateCategoryMutation()
  const [deleteCategory] = useDeleteCategoryMutation()
  const { data: categories, isLoading, isError } = useGetCategoriesQuery()

  const [name, setName] = useState('')
  const [editableName, setEditableName] = useState('')
  const [editableCategoryId, setEditableCategoryId] = useState('')
  const [editableCategory, setEditableCategory] = useState('')

  const [isAddOrUpdate, setIsAddOrUpdate] = useState(false)
  const [categoriesCopy, setCategoriesCopy] = useState([])
  const [isSorted, setIsSorted] = useState(false)

  if (isLoading)
    return <div>Loading categories...</div>

  if (isError)
      return <div>Error loading categories.</div>

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
    setEditableCategory(category)
    setName(category.name)
    setIsAddOrUpdate(true)
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

  const handleSave = async (e) => {
    e.preventDefault()

    try {
      const updatedCategory = { ...editableCategory, name }
      const result = await updateCategory(updatedCategory).unwrap()

      if (result.error) {
        toast.error(result.error)
        return
      }

      setEditableName('')
      setEditableCategoryId('')
      setEditableCategory('')

      toast.success('Category has been successfully updated.')
      handleExitEdit()
    }

    catch (error) {
      toast.error(error?.data?.message || error.message)
      console.error(error)
    }
  }

  const handleExitEdit = () => {
    setIsAddOrUpdate(false)
    setEditableCategoryId('x')
    setName('')
  }

  const sortAZ = () => {
    toast.info("Sorted in alphabetical Order.")

    setIsSorted(true)
    // Create a new copy of allProducts
    const sortedCategories = [...categories].sort((a, b) => {
      return a.name.localeCompare(b.name, 'en', { sensitivity: 'base' });
    });

    // Update state with the sorted products
    setCategoriesCopy(sortedCategories);
  };

  const sortZA = () => {
    toast.info("Sorted in reverse alphabetical Order.")

    setIsSorted(true)
    // Create a new copy of allProducts
    const sortedCategories = [...categories].sort((a, b) => {
      return b.name.localeCompare(a.name, 'en', { sensitivity: 'base' });
    });

    // Update state with the sorted products
    setCategoriesCopy(sortedCategories);
  };

  return (
    <>
      <div className="flex items-center justify-center h-screen cursor-default">
        <div className="bg-white flex flex-col w-[90%] h-[75%] -mt-[5rem] shadow-xl px-[2rem]">

          <div className="flex flex-row h-[20%] items-center justify-between">
            <span className="font-semibold text-neutral-700 text-2xl ml-[1rem]">Categories</span>

            <div className="flex flex-row items-end gap-5">
              <div className="flex flex-row gap-2">
                <RiSortAlphabetAsc onClick={sortAZ} className="bg-neutral-200 h-5 w-5 p-0.5 cursor-pointer hover:text-blue-900 transition duration-200" />
                <RiSortAlphabetDesc onClick={sortZA} className="bg-neutral-200 h-5 w-5 p-0.5 cursor-pointer hover:text-blue-900 transition duration-200" />
              </div>

              <button onClick={() => setIsAddOrUpdate(!isAddOrUpdate)} className="bg-blue-700 hover:bg-blue-900 text-white text-2xl px-2 pb-1">+</button>
            </div>
          </div>

          <table className="w-full flex flex-col justify-between border-[2px] h-[70%] overflow-y-auto">
            <thead className="flex flex-row justify-start text-neutral-500 text-xs sm:text-sm border-b-2 p-2 bg-[#f0f0f3]">
              <th className="flex flex-row justify-center font-semibold w-[10%]">Index</th>
              <th className="hidden md:block text-center font-semibold w-[40%]">ID</th>
              <th className="flex flex-row justify-center font-semibold w-[50%] md:w-[40%]">Name</th>
              <th className="flex flex-row justify-center font-semibold w-[40%] md:w-[10%]">Actions</th>
            </thead>

            {(!isSorted ? categories : categoriesCopy).map((c, index) => (
              <tr key={c._id} className="flex flex-row px-2 pb-2.5 border-b-[1.5px] justify-start align-middle text-sm sm:text-base">
                <td className="w-[10%] flex flex-row justify-center">{index + 1}</td>
                <td className="hidden md:block w-[40%] justify-center text-center px-4">{c._id}</td>
                <td className="w-[50%] md:w-[40%] flex flex-row justify-center px-4">{c.name}</td>

                <td className="flex flex-row gap-2 justify-center px-4 w-[40%] md:w-[10%]">
                  <lord-icon
                    class="cursor-pointer"
                    onClick={() => handleEdit(c)}
                    src="https://cdn.lordicon.com/oqaajvyl.json"
                    trigger="hover"
                    state="hover-line"
                    stroke="bold"
                    colors="primary:#000000,secondary:#1d4ed8"
                    style={{ width: "25px", height: "25px" }}>
                  </lord-icon>

                  <lord-icon
                    class="cursor-pointer"
                    onClick={() => handleDelete(c)}
                    src="https://cdn.lordicon.com/skkahier.json"
                    trigger="hover"
                    stroke="bold"
                    colors="primary:#c71f16"
                    style={{ width: "25px", height: "25px" }}>
                  </lord-icon>
                </td>
              </tr>
            ))}
          </table>
        </div>

        {isAddOrUpdate && (
          <>
            <div className="overlay flex w-full h-full -mt-[2rem] absolute bg-black opacity-70">
            </div>

            <div className="overlay flex flex-col gap-4 w-[25%] h-[35%] -mt-[5rem] absolute bg-white opacity-[100%]">
              <div className="flex flex-col items-end mb-[1rem]">
                <button className="bg-red-700 hover:bg-red-900 text-white px-2 pb-1" onClick={handleExitEdit}>x</button>
              </div>

              <span className="justify-center text-center font-semibold text-neutral-700 text-2xl -mt-[1.5rem]">{editableCategoryId ? "Update Category" : "Add Category"}</span>

              <div className="flex flex-row justify-center w-full px-5 gap-3">
                <input type="text" className="bg-white w-[15rem] border-[1px] border-neutral-400 pl-2 py-1 text-md" placeholder="Name" value={name} onChange={e => setName(e.target.value)} />
              </div>

              <div className="flex flex-row justify-center">
                <button onClick={editableCategoryId !== 'x' ? handleSave : handleAddCategory} className="px-4 py-2 bg-blue-900 hover:bg-blue-700 text-white w-fit rounded-xl">Submit</button>
              </div>
            </div>
          </>
        )}

      </div >
    </>
  )
}

export default Categories