import { useState, useEffect } from "react"
import { AiOutlineStar, AiFillStar, } from "react-icons/ai"
import { toast } from 'react-toastify'
import { useAddReviewMutation, useGetProductDetailsQuery } from "../../redux/api/productApiSlice"
import { useParams } from "react-router"
import { useSelector, useDispatch } from "react-redux"
import { addToCart } from "../../redux/features/cart/cartSlice"

const ProductDetails = () => {
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState('')
  const [quantity, setQuantity] = useState(1)

  const [addReview] = useAddReviewMutation()
  const { userInfo } = useSelector(state => state.auth)
  const cart = useSelector(state => state.cart)
  const dispatch = useDispatch()

  const { id } = useParams()
  const { data: product, isLoading: isLoadingProduct, isError: errProduct } = useGetProductDetailsQuery(id)

  if (isLoadingProduct)
    return <div>Loading...</div>

  if (errProduct)
    return <div>Error loading product.</div>

  const handleSubmit = async () => {
    // Ensure product and user data are loaded
    if (!product || isLoadingProduct) {
      toast.error("Data is still loading. Please wait.")
      return
    }

    if (rating === 0) {
      toast.error("Please provide a rating for the product.")
      return
    }

    const review = { rating, comment, user: userInfo._id }

    try {
      const response = await addReview({ id, review })

      if (response.error?.data?.message) {
        toast.error(response.error.data.message)
        return
      }

      if (response.error?.data?.error) {
        toast.error(response.error.data.error)
        return
      }

      console.log(response)
      toast.success("Your review has been added.")
    }

    catch (err) {
      toast.error("An error has occurred while submitting your review.")
      console.error(err)
    }
  }

  const handleAddToCart = () => {
    const alreadyInCart = cart.cartItems.find(i => i._id === product._id)

    if (alreadyInCart){
      toast.warning("Product is already in your cart.")
      return
    }

    try {
      dispatch(addToCart({ ...product, quantity }))

      toast.success("Product has been added to your cart.")
      toast.info("Navigate to the cart to checkout.")
    }

    catch (err) {
      toast.error("An error occured while adding the product to your cart.")
      console.error(err)
    }
  }

  const handleDecrement = () => {
    if (quantity >= 1)
      setQuantity(quantity - 1)
  }

  return (
    <>
      <div className="flex flex-col justify-center align-middle items-center mt-[3rem] gap-10">
        <div className="flex flex-row justify-center align-middle items-center gap-2">
          <img src={product.image} alt="img.png" className="w-10 h-10" />
          <div>{product.name}</div>
          <div>{product.description}</div>
          <div>{product.rating}</div>
          <div>{product.numReviews}</div>
          <div>{product.categoryName}</div>
          <div>Rs.{product.price}</div>
        </div>


        <div className="flex flex-row justify-center align-middle items-center gap-2">
          {rating === 0 && (
            <>
              <AiOutlineStar className="text-amber-600 w-10 h-10 cursor-pointer" onClick={() => setRating(1)} />
              <AiOutlineStar className="text-amber-600 w-10 h-10 cursor-pointer" onClick={() => setRating(2)} />
              <AiOutlineStar className="text-amber-600 w-10 h-10 cursor-pointer" onClick={() => setRating(3)} />
              <AiOutlineStar className="text-amber-600 w-10 h-10 cursor-pointer" onClick={() => setRating(4)} />
              <AiOutlineStar className="text-amber-600 w-10 h-10 cursor-pointer" onClick={() => setRating(5)} />
            </>
          )}

          {rating === 1 && (
            <>
              <AiFillStar className="text-amber-600 w-10 h-10 cursor-pointer" onClick={() => setRating(1)} />
              <AiOutlineStar className="text-amber-600 w-10 h-10 cursor-pointer" onClick={() => setRating(2)} />
              <AiOutlineStar className="text-amber-600 w-10 h-10 cursor-pointer" onClick={() => setRating(3)} />
              <AiOutlineStar className="text-amber-600 w-10 h-10 cursor-pointer" onClick={() => setRating(4)} />
              <AiOutlineStar className="text-amber-600 w-10 h-10 cursor-pointer" onClick={() => setRating(5)} />
            </>
          )}

          {rating === 2 && (
            <>
              <AiFillStar className="text-amber-600 w-10 h-10 cursor-pointer" onClick={() => setRating(1)} />
              <AiFillStar className="text-amber-600 w-10 h-10 cursor-pointer" onClick={() => setRating(2)} />
              <AiOutlineStar className="text-amber-600 w-10 h-10 cursor-pointer" onClick={() => setRating(3)} />
              <AiOutlineStar className="text-amber-600 w-10 h-10 cursor-pointer" onClick={() => setRating(4)} />
              <AiOutlineStar className="text-amber-600 w-10 h-10 cursor-pointer" onClick={() => setRating(5)} />
            </>
          )}

          {rating === 3 && (
            <>
              <AiFillStar className="text-amber-600 w-10 h-10 cursor-pointer" onClick={() => setRating(1)} />
              <AiFillStar className="text-amber-600 w-10 h-10 cursor-pointer" onClick={() => setRating(2)} />
              <AiFillStar className="text-amber-600 w-10 h-10 cursor-pointer" onClick={() => setRating(3)} />
              <AiOutlineStar className="text-amber-600 w-10 h-10 cursor-pointer" onClick={() => setRating(4)} />
              <AiOutlineStar className="text-amber-600 w-10 h-10 cursor-pointer" onClick={() => setRating(5)} />
            </>
          )}

          {rating === 4 && (
            <>
              <AiFillStar className="text-amber-600 w-10 h-10 cursor-pointer" onClick={() => setRating(1)} />
              <AiFillStar className="text-amber-600 w-10 h-10 cursor-pointer" onClick={() => setRating(2)} />
              <AiFillStar className="text-amber-600 w-10 h-10 cursor-pointer" onClick={() => setRating(3)} />
              <AiFillStar className="text-amber-600 w-10 h-10 cursor-pointer" onClick={() => setRating(4)} />
              <AiOutlineStar className="text-amber-600 w-10 h-10 cursor-pointer" onClick={() => setRating(5)} />
            </>
          )}

          {rating === 5 && (
            <>
              <AiFillStar className="text-amber-600 w-10 h-10 cursor-pointer" onClick={() => setRating(1)} />
              <AiFillStar className="text-amber-600 w-10 h-10 cursor-pointer" onClick={() => setRating(2)} />
              <AiFillStar className="text-amber-600 w-10 h-10 cursor-pointer" onClick={() => setRating(3)} />
              <AiFillStar className="text-amber-600 w-10 h-10 cursor-pointer" onClick={() => setRating(4)} />
              <AiFillStar className="text-amber-600 w-10 h-10 cursor-pointer" onClick={() => setRating(5)} />
            </>
          )}
        </div>

        <div className="flex flex-col justify-center align-middle items-center gap-3">
          <input type="text" className="w-[15rem]" value={comment} placeholder="This field can be left blank" onChange={e => setComment(e.target.value)} />
          <button className="bg-black text-white px-4 py-2" onClick={handleSubmit}>Submit</button>
        </div>

        <div>
          {product.numReviews === 0 ? <div>No reviews have been submitted for this product.</div> : (
            (product.reviews.map((r, index) => (
              <div key={index} className="flex flex-row justify-center align-middle items-center gap-2">
                <div>{r.rating}</div>
                <div>{r.comment === "" ? "No comment" : r.comment}</div>
              </div>
            )))
          )}
        </div>

        <div className="flex flex-row justify-center align-middle items-center gap-3">
          <button onClick={handleDecrement} className="bg-black text-white rounded-md px-2">-</button>
          <div>{quantity}</div>
          <button onClick={() => setQuantity(quantity + 1)} className="bg-black text-white rounded-md px-2">+</button>
        </div>

        <div className="flex flex-row justify-center align-middle items-center gap-3">
          <button onClick={handleAddToCart} className="bg-blue-900 hover:bg-blue-950 text-white rounded-md px-4 py-2">Add to Cart</button>
        </div>
      </div >
    </>
  )
}

export default ProductDetails