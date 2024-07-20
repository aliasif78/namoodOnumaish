import { useState, useEffect } from "react"
import { toast } from 'react-toastify'
import { useAddProductMutation, useGetProductsQuery, useUpdateProductMutation, useDeleteProductMutation } from "../../redux/api/productApiSlice"
import { useGetCategoriesQuery } from "../../redux/api/categoryApiSlice"
import { getStorage, ref, getDownloadURL } from "firebase/storage"
import { Link } from 'react-router-dom'
import "./Products.css"

import { RiSortAlphabetAsc, RiSortAlphabetDesc, RiCoinFill } from "react-icons/ri";
import { PiShootingStarFill } from 'react-icons/pi'
import { GiFallingStar } from "react-icons/gi";
import { TbSquareRoundedArrowDown } from "react-icons/tb";
import { FaCoins } from "react-icons/fa";
import { MdAutoGraph } from "react-icons/md";

const Products = () => {
  const [name, setName] = useState('')
  const [image, setImage] = useState('')
  const [category, setCategory] = useState('x')
  const [categoryName, setCategoryName] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState('')
  const [inStock, setInStock] = useState('')

  const [editableProductId, setEditableProductId] = useState('')
  const [isAddOrUpdate, setIsAddOrUpdate] = useState(false)

  const [addProduct] = useAddProductMutation()
  const [deleteProduct] = useDeleteProductMutation()
  const [updateProduct] = useUpdateProductMutation()
  const { data: allProducts, isLoading: isLoadingProducts, isError: errProducts } = useGetProductsQuery()
  const { data: allCategories, isLoading: isLoadingCategories, isError: errCategories } = useGetCategoriesQuery()

  const [productsCopy, setProductsCopy] = useState([])
  const [isSorted, setIsSorted] = useState(false)

  if (isLoadingProducts)
    return <div>Loading products...</div>

  if (errProducts)
    return <div>Error fetching products.</div>

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

    if (!category || category === "Category") {
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

    if (!editableProductId)
      toast.info("Adding product, please wait...")
    else
      toast.info("Updating product, please wait...")

    // Get Firebase download URL for the image
    const storage = getStorage();
    const storageRef = ref(storage, image)

    const downloadURL = await getDownloadURL(storageRef)
      .catch(err => {
        console.error('Error fetching image: ', err)
        return
      })

    setImage(downloadURL);

    try {
      if (!editableProductId) {
        const result = await addProduct({ name, image: downloadURL, category, categoryName, description, price, inStock }).unwrap()

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
        setCategoryName('')
        setInStock('')
      }

      else {
        const result = await updateProduct({ _id: editableProductId, name, image: downloadURL, category, categoryName, description, price, inStock }).unwrap()

        if (result.error) {
          toast.error(result.error)
          return
        }

        toast.success(`${name} has been updated successfully.`)

        setEditableProductId('')
        setName('')
        setImage('')
        setDescription('')
        setPrice('')
        setCategory('')
        setCategoryName('')
        setInStock('')
      }
    }

    catch (error) {
      toast.error("Failed to add product.")
      console.log(error.data)
    }
  }

  const handleDelete = async (p) => {
    if (window.confirm("Are you sure that you want to delete this product?")) {
      try {
        await deleteProduct(p._id)
        toast.success(`${p.name} deleted successfully.`)
      }

      catch (err) {
        console.error(err)
        toast.error("Error deleting product.")
      }
    }
  }

  const handleEdit = async (p) => {
    setIsAddOrUpdate(true)
    setEditableProductId(p._id)
    setName(p.name)
    setImage(p.image)
    setDescription(p.description)
    setPrice(p.price)
    setCategory('x')
    setCategoryName('x')
    setInStock(p.inStock)
  }

  const handleCategoryChange = async (e) => {
    const selectedCategoryId = e.target.value;
    const selectedCategory = allCategories.find(c => c._id === selectedCategoryId);

    if (selectedCategory) {
      setCategory(selectedCategoryId);
      setCategoryName(selectedCategory.name); // Set category name based on selection
    }
  }

  const handleExitEdit = () => {
    setIsAddOrUpdate(false)
    setEditableProductId('')
    setName('')
    setImage('')
    setDescription('')
    setPrice('')
    setCategory('')
    setCategoryName('')
    setInStock('')
  }

  const sortAZ = () => {
    toast.info("Sorted in alphabetical Order.")

    setIsSorted(true)
    // Create a new copy of allProducts
    const sortedProducts = [...allProducts].sort((a, b) => {
      return a.name.localeCompare(b.name, 'en', { sensitivity: 'base' });
    });

    // Update state with the sorted products
    setProductsCopy(sortedProducts);
  };

  const sortZA = () => {
    toast.info("Sorted in reverse alphabetical order.")
    setIsSorted(true)

    // Create a new copy of allProducts
    const sortedProducts = [...allProducts].sort((a, b) => {
      return b.name.localeCompare(a.name, 'en', { sensitivity: 'base' });
    });

    // Update state with the sorted products
    setProductsCopy(sortedProducts);
  };

  const sortPriceLH = () => {
    toast.info("Sorted by price in ascending order.")
    setIsSorted(true)

    // Create a new copy of allProducts
    const sortedProducts = [...allProducts].sort((a, b) => {
      return a.price - b.price
    });

    // Update state with the sorted products
    setProductsCopy(sortedProducts);
  };

  const sortPriceHL = () => {
    toast.info("Sorted by price in descending order.")
    setIsSorted(true)

    // Create a new copy of allProducts
    const sortedProducts = [...allProducts].sort((a, b) => {
      return b.price - a.price
    });

    // Update state with the sorted products
    setProductsCopy(sortedProducts);
  };

  const sortRatingLH = () => {
    toast.info("Sort by rating in ascending order.")
    setIsSorted(true)

    // Create a new copy of allProducts
    const sortedProducts = [...allProducts].sort((a, b) => {
      return a.rating - b.rating
    });

    // Update state with the sorted products
    setProductsCopy(sortedProducts);
  };

  const sortRatingHL = () => {
    toast.info("Sorted by rating in descending order.")
    setIsSorted(true)

    // Create a new copy of allProducts
    const sortedProducts = [...allProducts].sort((a, b) => {
      return b.rating - a.rating
    });

    // Update state with the sorted products
    setProductsCopy(sortedProducts);
  };

  const sortStockLH = () => {
    toast.info("Sorted by available stock in ascending order.")
    setIsSorted(true)

    // Create a new copy of allProducts
    const sortedProducts = [...allProducts].sort((a, b) => {
      return a.inStock - b.inStock
    });

    // Update state with the sorted products
    setProductsCopy(sortedProducts);
  };

  const sortSoldHL = () => {
    toast.info("Sorted by units sold in descending order.")
    setIsSorted(true)

    // Create a new copy of allProducts
    const sortedProducts = [...allProducts].sort((a, b) => {
      return b.unitsSold - a.unitsSold
    });

    // Update state with the sorted products
    setProductsCopy(sortedProducts);
  };

  return (
    <>
      <div className="flex items-center justify-center h-screen cursor-default">
        <div className="bg-white flex flex-col w-[90%] h-[75%] -mt-[5rem] shadow-xl px-[2rem]">

          <div className="flex flex-row h-[20%] items-center justify-between">
            <span className="font-semibold text-neutral-700 text-2xl ml-[1rem]">Products</span>

            <div className="flex flex-row items-end gap-5">
              <div className="hidden sm:flex flex-row gap-4">
                <div className="flex flex-row gap-2">
                  <TbSquareRoundedArrowDown onClick={sortStockLH} className="bg-neutral-200 h-5 w-5 p-0.5 cursor-pointer hover:text-blue-900 transition duration-200" />
                  <MdAutoGraph onClick={sortSoldHL} className="bg-neutral-200 h-5 w-5 p-0.5 cursor-pointer hover:text-blue-900 transition duration-200" />
                </div>

                <div className="flex flex-row gap-2">
                  <RiCoinFill onClick={sortPriceLH} className="bg-neutral-200 h-5 w-5 p-1 cursor-pointer hover:text-blue-900 transition duration-200" />
                  <FaCoins onClick={sortPriceHL} className="bg-neutral-200 h-5 w-5 p-1 cursor-pointer hover:text-blue-900 transition duration-200" />
                </div>

                <div className="flex flex-row gap-2">
                  <GiFallingStar onClick={sortRatingLH} className="bg-neutral-200 h-5 w-5 p-0.5 cursor-pointer hover:text-blue-900 transition duration-200" />
                  <PiShootingStarFill onClick={sortRatingHL} className="bg-neutral-200 h-5 w-5 p-0.5 cursor-pointer hover:text-blue-900 transition duration-200" />
                </div>

                <div className="flex flex-row gap-2">
                  <RiSortAlphabetAsc onClick={sortAZ} className="bg-neutral-200 h-5 w-5 p-0.5 cursor-pointer hover:text-blue-900 transition duration-200" />
                  <RiSortAlphabetDesc onClick={sortZA} className="bg-neutral-200 h-5 w-5 p-0.5 cursor-pointer hover:text-blue-900 transition duration-200" />
                </div>
              </div>

              <button onClick={() => setIsAddOrUpdate(!isAddOrUpdate)} className="bg-blue-700 hover:bg-blue-900 text-white text-2xl px-2 pb-1">+</button>
            </div>
          </div>

          <table className="w-full flex flex-col justify-between border-[2px] gap-3 h-[70%] overflow-y-auto text-xs sm:text-base">
            <thead className="flex flex-row justify-start text-neutral-500 text-sm border-b-2 p-2 bg-[#f0f0f3]">
              <th className="font-semibold">ID</th>
              <th className="font-semibold hidden md:flex flex-row justify-center w-[10%]">Image</th>
              <th className="font-semibold w-[35%] sm:w-[25%] md:w-[17%]">Name</th>
              <th className="font-semibold w-[17%] hidden md:flex justify-center">Category</th>
              <th className="font-semibold hidden sm:flex flex-row justify-center lg:w-[7%] w-[10%]">Rating</th>
              <th className="font-semibold hidden sm:flex flex-row justify-center lg:w-[7%] md:w-[10%] w-[13%]">In Stock</th>
              <th className="font-semibold hidden sm:flex flex-row justify-center lg:w-[7%] w-[10%]">Sold</th>
              <th className="font-semibold md:w-[15%] sm:w-[20%] w-[30%]">Price</th>
              <th className="font-semibold w-[9%] hidden lg:flex justify-center">Discount</th>
              <th className="font-semibold w-[29%] sm:w-[19%] md:w-[9%]">Actions</th>
            </thead>

            {(!isSorted ? allProducts : productsCopy).map((p, index) => (
              <tr key={p._id} className="flex flex-row px-2 pb-2.5 border-b-[1.5px] justify-center align-middle">
                <td className="">{index + 1}</td>

                <td className="w-[10%] hidden md:flex flex-row justify-center ">
                  <img src={p.image} alt="img" className="w-7 h-7" />
                </td>

                <Link to={`/product/${p._id}`} className="w-[35%] sm:w-[25%] md:w-[17%] hover:text-blue-800 hover:underline flex flex-row justify-center px-4">{p.name.length > 13 ? `${p.name.substring(0, 13)}...` : `${p.name}`}</Link>
                <td className="w-[17%] hidden md:flex flex-row justify-center px-4">{p.categoryName}</td>
                <td className="lg:w-[7%] w-[10%] hidden sm:flex flex-row justify-center px-4">{p.rating}</td>
                <td className="lg:w-[7%] md:w-[10%] w-[13%] hidden sm:flex flex-row justify-center px-4">{p.inStock}</td>
                <td className="lg:w-[7%] w-[10%] hidden sm:flex flex-row justify-center px-4">{p.unitsSold}</td>
                <td className="md:w-[15%] sm:w-[20%] w-[30%] flex flex-row justify-center px-4">Rs. {p.price}</td>
                <td className="w-[9%] hidden lg:flex flex-row justify-center px-4">{p.discountPercent}%</td>

                <td className="w-[29%] sm:w-[19%] md:w-[9%] flex flex-row gap-2 justify-center px-4">
                  <lord-icon
                    class="cursor-pointer"
                    onClick={() => handleEdit(p)}
                    src="https://cdn.lordicon.com/oqaajvyl.json"
                    trigger="hover"
                    state="hover-line"
                    stroke="bold"
                    colors="primary:#000000,secondary:#1d4ed8"
                    style={{ width: "25px", height: "25px" }}>
                  </lord-icon>

                  <lord-icon
                    class="cursor-pointer"
                    onClick={() => handleDelete(p)}
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
            <div className="overlay flex w-full h-full -mt-[2rem] absolute bg-black opacity-70"></div>

            <div className="overlay flex flex-col gap-4 w-[70%] md:w-[60%] lg:w-[30%] h-[65%] -mt-[5rem] absolute bg-white opacity-[100%]">
              <div className="flex flex-col items-end mb-[1rem]">
                <button className="bg-red-700 hover:bg-red-900 text-white px-2 pb-1" onClick={handleExitEdit}>x</button>
              </div>

              <span className="justify-center text-center font-semibold text-neutral-700 text-2xl -mt-[1.5rem]">{editableProductId ? "Update Product" : "Add Product"}</span>

              <div className="flex flex-row justify-center w-full px-5 gap-3">
                <input type="text" className="bg-white w-[50%] border-[1px] border-neutral-400 pl-2 py-1 text-md" placeholder="Name" value={name} onChange={e => setName(e.target.value)} />
                <input type="number" className="bg-white w-[50%] border-[1px] border-neutral-400 pl-2 py-1 text-md" placeholder="Price" value={price} onChange={e => setPrice(e.target.value)} />
              </div>

              <div className="px-5">
                <input type="text" className="bg-white border-[1px] border-neutral-400 w-[100%] pl-2 py-1 text-md" placeholder="Image URL" value={image} onChange={e => setImage(e.target.value)} />
              </div>

              <div className="flex flex-row justify-center w-full px-5 gap-3">
                <input type="inStock" className="bg-white w-[50%] border-[1px] border-neutral-400 pl-2 py-1 text-md" placeholder="Count in Stock" value={inStock} onChange={e => setInStock(e.target.value)} />

                <select name="categories" id="categories" required={true} onChange={handleCategoryChange} className={`bg-white w-[50%] border-[1px] border-neutral-400 pl-2 py-1 text-md ${category === "x" ? "text-neutral-400" : "text-black"}`}>
                  <option value="">Category</option>

                  {allCategories && allCategories.map(c => (
                    <option value={c._id} key={c._id}>{c.name}</option>
                  ))}
                </select>
              </div>

              <div className="px-5">
                <textarea name="description" id="description" value={description} onChange={e => setDescription(e.target.value)} placeholder="Description" className="border-[1px] border-neutral-400 w-[100%] pl-2 py-1"></textarea>
              </div>

              <div className="flex flex-row justify-center">
                <button onClick={handleSubmit} className="px-4 py-2 bg-blue-900 hover:bg-blue-700 text-white w-fit rounded-xl">Submit</button>
              </div>
            </div>
          </>
        )}

      </div >
    </>
  )
}

export default Products