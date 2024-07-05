import { useState, useEffect } from "react"
import { toast } from 'react-toastify'
import { useAddProductMutation, useGetProductsQuery, useUpdateProductsMutation, useDeleteProductsMutation } from "../../redux/api/productApiSlice"
import { useGetCategoriesQuery } from "../../redux/api/categoryApiSlice"
import { getStorage, ref, getDownloadURL } from "firebase/storage"
import { FaTrash, FaEdit } from 'react-icons/fa'

const Products = () => {
  // --- Product to be added --- //
  const [name, setName] = useState('')
  const [image, setImage] = useState('')
  const [category, setCategory] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState('')
  const [inStock, setInStock] = useState('')

  const [addProduct] = useAddProductMutation()

  // --- Get Products --- //
  const { data: allProducts, isLoadingProducts, errProducts } = useGetProductsQuery()

  if (isLoadingProducts)
    return <div>Loading products...</div>

  if (errProducts)
    return <div>Error fetching products.</div>

  // --- Get Categories --- //
  const { data: allCategories, isLoadingCategories, errCategories } = useGetCategoriesQuery()

  if (isLoadingCategories)
    return <div>Loading categories...</div>

  if (errCategories)
    return <div>Error fetching categories.</div>

  const handleSubmit = async (e) => {
    // Will prevent page reload on form submission or prevent default behaviour upon click of a link or a button within the form
    e.preventDefault()

    if (!name) {
      toast.error("Please provide a name for the product.")
      return
    }

    if (!image) {
      toast.error("Please provide a image for the product.")
      return
    }

    if (!category || category === "Select") {
      toast.error("Please provide a category for the product.")
      return
    }

    if (!description) {
      toast.error("Please provide a description for the product.")
      return
    }

    if (!price) {
      toast.error("Please provide a price for the product.")
      return
    }

    if (!inStock) {
      toast.error("Please provide the stock quantity for the product.")
      return
    }

    // Get Firebase download URL for the image
    toast.info("Adding product, please wait...")

    const storage = getStorage();
    const storageRef = ref(storage, image)

    const downloadURL = await getDownloadURL(storageRef)
      .catch(err => {
        console.error('Error fetching image: ', err)
        return
      })

    setImage(downloadURL);

    try {
      const result = await addProduct({ name, image: downloadURL, category, description, price, inStock }).unwrap()

      if (result.error) {
        toast.error(result.error)
        return
      }

      toast.success(`${name} has been added successfully.`)

      setName('')
      setImage('')
      setDescription('')
      setPrice('')
      setCategory('')
      setInStock('')
    }

    catch (error) {
      toast.error("Failed to add product.")
      console.log(error.data)
    }
  }

  const handleDelete = async (e)=>{

  }

  const handleEdit = async (e)=>{

  }

  return (
    <>
      <div className="w-full h-full flex flex-row justify-between px-[5rem]">
        <form action="submit" className='flex flex-col mt-[5rem] items-center gap-5' onSubmit={handleSubmit}>
          <input className="w-[10rem]" type="text" onChange={e => setName(e.target.value)} value={name} placeholder="Name" />
          <input className="w-[10rem]" type="text" onChange={e => setImage(e.target.value)} value={image} placeholder="Image URL" />
          <input className="w-[10rem]" type="text" onChange={e => setDescription(e.target.value)} value={description} placeholder="Description" />
          <input className="w-[10rem]" type="number" onChange={e => setPrice(e.target.value)} value={price} placeholder="Price" />
          <input className="w-[10rem]" type="number" onChange={e => setInStock(e.target.value)} value={inStock} placeholder="In Stock" />
          {/* <input className="w-[10rem]" type="text" onChange={e => setCategory(e.target.value)} value={category} placeholder="Category" /> */}

          {/* Name attribute for select is neccessary otherwise no data will be submitted */}
          {/* Id attribute associates it with a label */}
          <select name="catgories" id="categories" required={true} onChange={e => setCategory(e.target.value)} >
            <option>Select</option>

            {allCategories && allCategories.map(c => (
              <option key={c._id} value={c._id}>{c.name}</option>
            ))}
          </select>

          <button className="bg-black text-white px-4 py-2" type="submit">Add</button>
        </form>

        <div className="flex flex-col gap-3 mt-[4rem]">
          {allProducts && (allProducts.length === 0 ? <div>No products have been added yet.</div> : (
            allProducts.map(p => (
              <div className="flex flex-row gap-3 items-center align-middle">
                <img src={p.image} alt="image.png" className="h-10 w-10" />
                <div>{p.name}</div>
                <div>{p.description}</div>
                <div>Rs.{p.price}</div>
                <div>{p.inStock}</div>
                <div>{p.category}</div>

                <FaTrash onClick={handleDelete} className="cursor-pointer text-red-700" />
                <FaEdit onClick={handleEdit} className="cursor-pointer text-cyan-800" />
              </div>
            ))
          ))}
        </div>
      </div>

    </>
  )
}

export default Products