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

    if (alreadyInCart) {
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
      <div className="flex flex-col md:flex-row items-center md:items-start gap-[3rem] px-[3rem] pt-[1.8rem]">
        <img src="https://www.vsurfaces.com/cdn/shop/files/modern-cloud-couch-with-soft-boucle-upholstered-7-seaters-comfy-couch-for-living-room-home-office-648907.jpg?v=1714469587&width=1800" alt="img" className="w-[75%] md:w-[65%] lg:w-[28rem] h-[50%] lg:h-[28rem]" />

        <div className="flex flex-col justify-center gap-[1rem]">
          <h1 className="text-3xl">Vintage Round Table</h1>
          <p className="text-md">Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore fuga maxime provident, eligendi adipisci numquam aperiam incidunt quos natus voluptatum.</p>
          <div className="text-xl font-semibold">Rs. 15,000</div>

          <div className="flex flex-row gap-1">
            <AiFillStar className="text-[#c0a300] w-5 h-5" />
            <AiFillStar className="text-[#c0a300] w-5 h-5" />
            <AiFillStar className="text-[#c0a300] w-5 h-5" />
            <AiFillStar className="text-[#c0a300] w-5 h-5" />
            <AiFillStar className="text-[#c0a300] w-5 h-5" />
          </div>

          <span className="w-full h-[1px] bg-neutral-500"></span>

          <div className="flex flex-col gap-[1rem]">
            <div className="flex flex-col gap-2 mt-[1rem]">
              <h1 className="text-lg">Quantity</h1>

              <select name="quantity" id="quantity" className="flex flex-row justify-center text-center w-fit bg-black text-white px-4 py-1">
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
              </select>
            </div>

            <div className="flex flex-col gap-2">
              <div className="flex flex-row gap-2">
                <lord-icon
                  src="https://cdn.lordicon.com/ulnswmkk.json"
                  trigger="morph"
                  state="morph-heart"
                  colors="primary:#000000"
                  style={{ width: "25px", height: "25px" }}>
                </lord-icon>

                <span>100,000+ Happy Customers</span>
              </div>

              <div className="flex flex-row gap-2">
                <lord-icon
                  src="https://cdn.lordicon.com/lomfljuq.json"
                  trigger="hover"
                  colors="primary:#000000"
                  style={{ width: "25px", height: "25px" }}>
                </lord-icon>

                <span>7 Days Return Policy</span>
              </div>

              <div className="flex flex-row gap-2">
                <lord-icon
                  src="https://cdn.lordicon.com/wmlleaaf.json"
                  trigger="hover"
                  colors="primary:#000000"
                  style={{ width: "25px", height: "25px" }}>
                </lord-icon>

                <span>Timely Delivery</span>
              </div>
            </div>

            <button className="w-full bg-black hover:bg-neutral-700 transition duration-200 text-white py-2">ADD TO CART</button>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-[3rem] w-full justify-center text-center mt-[7rem]">
        <h1 className="text-3xl">Customer Reviews</h1>

        <div className="flex flex-col md:flex-row gap-[2rem] -mt-[1rem] md:gap-[5rem] px-[3rem] lg:px-[7rem] justify-center items-center">
          <div className="flex flex-col gap-1 justify-center">
            <div className="flex flex-row gap-1 justify-center">
              <AiFillStar className="text-[#c0a300] w-5 h-5" />
              <AiFillStar className="text-[#c0a300] w-5 h-5" />
              <AiFillStar className="text-[#c0a300] w-5 h-5" />
              <AiFillStar className="text-[#c0a300] w-5 h-5" />
              <AiFillStar className="text-[#c0a300] w-5 h-5" />
            </div>

            <span className="text-[#687e61] underline">4.95 out of 5</span>
            <span>Based on 80 reviews.</span>
          </div>

          <div className="flex flex-col gap-1">
            <div className="flex flex-row gap-5">
              <div className="flex flex-row gap-1">
                <AiFillStar className="text-[#87a97d] w-5 h-5" />
                <AiFillStar className="text-[#87a97d] w-5 h-5" />
                <AiFillStar className="text-[#87a97d] w-5 h-5" />
                <AiFillStar className="text-[#87a97d] w-5 h-5" />
                <AiFillStar className="text-[#87a97d] w-5 h-5" />
              </div>

              <span className="flex flex-row w-[10rem]">
                <span className="bg-[#87a97d] w-[90%]"></span>
                <span className="bg-neutral-300 w-[10%]"></span>
              </span>

              <span className="text-sm">77</span>
            </div>

            <div className="flex flex-row gap-5">
              <div className="flex flex-row gap-1">
                <AiFillStar className="text-[#87a97d] w-5 h-5" />
                <AiFillStar className="text-[#87a97d] w-5 h-5" />
                <AiFillStar className="text-[#87a97d] w-5 h-5" />
                <AiFillStar className="text-[#87a97d] w-5 h-5" />
                <AiOutlineStar className="text-[#87a97d] w-5 h-5" />
              </div>

              <span className="flex flex-row w-[10rem]">
                <span className="bg-[#87a97d] w-[5%]"></span>
                <span className="bg-neutral-300 w-[95%]"></span>
              </span>

              <span className="text-sm">2</span>
            </div>

            <div className="flex flex-row gap-5">
              <div className="flex flex-row gap-1">
                <AiFillStar className="text-[#87a97d] w-5 h-5" />
                <AiFillStar className="text-[#87a97d] w-5 h-5" />
                <AiFillStar className="text-[#87a97d] w-5 h-5" />
                <AiOutlineStar className="text-[#87a97d] w-5 h-5" />
                <AiOutlineStar className="text-[#87a97d] w-5 h-5" />
              </div>

              <span className="flex flex-row w-[10rem]">
                <span className="bg-[#87a97d] w-[3%]"></span>
                <span className="bg-neutral-300 w-[97%]"></span>
              </span>

              <span className="text-sm">1</span>
            </div>

            <div className="flex flex-row gap-5">
              <div className="flex flex-row gap-1">
                <AiFillStar className="text-[#87a97d] w-5 h-5" />
                <AiFillStar className="text-[#87a97d] w-5 h-5" />
                <AiOutlineStar className="text-[#87a97d] w-5 h-5" />
                <AiOutlineStar className="text-[#87a97d] w-5 h-5" />
                <AiOutlineStar className="text-[#87a97d] w-5 h-5" />
              </div>

              <span className="flex flex-row w-[10rem]">
                <span className="bg-neutral-300 w-[100%]"></span>
              </span>

              <span className="text-sm">0</span>
            </div>

            <div className="flex flex-row gap-5">
              <div className="flex flex-row gap-1">
                <AiFillStar className="text-[#87a97d] w-5 h-5" />
                <AiOutlineStar className="text-[#87a97d] w-5 h-5" />
                <AiOutlineStar className="text-[#87a97d] w-5 h-5" />
                <AiOutlineStar className="text-[#87a97d] w-5 h-5" />
                <AiOutlineStar className="text-[#87a97d] w-5 h-5" />
              </div>

              <span className="flex flex-row w-[10rem]">
                <span className="bg-neutral-300 w-[100%]"></span>
              </span>

              <span className="text-sm">0</span>
            </div>
          </div>

          <div className="flex flex-col justify-center">
            <button className="bg-[#687e61] hover:bg-[#495745] transition duration-200 text-white px-5 py-2 h-fit">Write a Review</button>
          </div>
        </div>

        <div className="flex flex-col gap-[3rem] h-fit w-full">
          <div className="flex flex-col gap-3 w-full border-[1px] border-neutral-300 py-[1rem] px-[2rem] sm:px-[5rem]">
            <div className="flex flex-row w-full gap-[1.5rem]">
              <div className="flex flex-row gap-1">
                <AiFillStar className="text-[#87a97d] w-5 h-5" />
                <AiFillStar className="text-[#87a97d] w-5 h-5" />
                <AiFillStar className="text-[#87a97d] w-5 h-5" />
                <AiFillStar className="text-[#87a97d] w-5 h-5" />
                <AiFillStar className="text-[#87a97d] w-5 h-5" />
              </div>

              <span className="text-sm">17/09/2024</span>
            </div>

            <div className="flex flex-row gap-3 justify-start">
              <h1 className="font-semibold text-lg">Ali Asif</h1>
              <span className="bg-black text-white text-xs px-2 pt-1.5">Verified</span>
            </div>

            <p className="text-sm w-full text-start">It was an amazing and loving card with great quality 😍 absolutely loved it</p>
          </div>

          <div className="flex flex-col gap-3 w-full border-[1px] border-neutral-300 py-[1rem] px-[2rem] sm:px-[5rem]">
            <div className="flex flex-row w-full gap-[1.5rem]">
              <div className="flex flex-row gap-1">
                <AiFillStar className="text-[#87a97d] w-5 h-5" />
                <AiFillStar className="text-[#87a97d] w-5 h-5" />
                <AiFillStar className="text-[#87a97d] w-5 h-5" />
                <AiFillStar className="text-[#87a97d] w-5 h-5" />
                <AiFillStar className="text-[#87a97d] w-5 h-5" />
              </div>

              <span className="text-sm">11/11/2022</span>
            </div>

            <div className="flex flex-row gap-3 justify-start">
              <h1 className="font-semibold text-lg">Abdullah Saqib</h1>
              <span className="bg-black text-white text-xs px-2 pt-1.5">Verified</span>
            </div>

            <p className="text-sm w-full text-start">i ordered relationship id card its lovely and best way to remind the special day and card quality is excellent</p>
          </div>

          <div className="flex flex-col gap-3 w-full border-[1px] border-neutral-300 py-[1rem] px-[2rem] sm:px-[5rem]">
            <div className="flex flex-row w-full gap-[1.5rem]">
              <div className="flex flex-row gap-1">
                <AiFillStar className="text-[#87a97d] w-5 h-5" />
                <AiFillStar className="text-[#87a97d] w-5 h-5" />
                <AiFillStar className="text-[#87a97d] w-5 h-5" />
                <AiFillStar className="text-[#87a97d] w-5 h-5" />
                <AiFillStar className="text-[#87a97d] w-5 h-5" />
              </div>

              <span className="text-sm">23/03/2022</span>
            </div>

            <div className="flex flex-row gap-3 justify-start">
              <h1 className="font-semibold text-lg">Ibrahim Saqib</h1>
              <span className="bg-black text-white text-xs px-2 pt-1.5">Verified</span>
            </div>

            <p className="text-sm w-full text-start">It's amazing ❤️</p>
          </div>

          <div className="flex flex-col gap-3 w-full border-[1px] border-neutral-300 py-[1rem] px-[2rem] sm:px-[5rem]">
            <div className="flex flex-row w-full gap-[1.5rem]">
              <div className="flex flex-row gap-1">
                <AiFillStar className="text-[#87a97d] w-5 h-5" />
                <AiFillStar className="text-[#87a97d] w-5 h-5" />
                <AiFillStar className="text-[#87a97d] w-5 h-5" />
                <AiFillStar className="text-[#87a97d] w-5 h-5" />
                <AiFillStar className="text-[#87a97d] w-5 h-5" />
              </div>

              <span className="text-sm">11/12/2023</span>
            </div>

            <div className="flex flex-row gap-3 justify-start">
              <h1 className="font-semibold text-lg">Hassan Aamir</h1>
              <span className="bg-black text-white text-xs px-2 pt-1.5">Verified</span>
            </div>

            <p className="text-sm w-full text-start">It's great!</p>
          </div>

          <div className="flex flex-col gap-3 w-full border-[1px] border-neutral-300 py-[1rem] px-[2rem] sm:px-[5rem]">
            <div className="flex flex-row w-full gap-[1.5rem]">
              <div className="flex flex-row gap-1">
                <AiFillStar className="text-[#87a97d] w-5 h-5" />
                <AiFillStar className="text-[#87a97d] w-5 h-5" />
                <AiFillStar className="text-[#87a97d] w-5 h-5" />
                <AiFillStar className="text-[#87a97d] w-5 h-5" />
                <AiFillStar className="text-[#87a97d] w-5 h-5" />
              </div>

              <span className="text-sm">01/06/2023</span>
            </div>

            <div className="flex flex-row gap-3 justify-start">
              <h1 className="font-semibold text-lg">Moaaz Aamir</h1>
              <span className="bg-black text-white text-xs px-2 pt-1.5">Verified</span>
            </div>

            <p className="text-sm w-full text-start">I just love this it's totally fulfill mine expectations or the reason for what I orderderd this is close to my heart or the mini cards you sent me are so cute thanku soo much I will shop again.</p>
          </div>
        </div>
      </div>
    </>

    // <>
    //   <div className="flex flex-col justify-center align-middle items-center mt-[3rem] gap-10">
    //     <div className="flex flex-row justify-center align-middle items-center gap-2">
    //       <img src={product.image} alt="img.png" className="w-10 h-10" />
    //       <div>{product.name}</div>
    //       <div>{product.description}</div>
    //       <div>{product.rating}</div>
    //       <div>{product.numReviews}</div>
    //       <div>{product.categoryName}</div>
    //       <div>Rs.{product.price}</div>
    //     </div>


    //     <div className="flex flex-row justify-center align-middle items-center gap-2">
    //       {rating === 0 && (
    //         <>
    //           <AiOutlineStar className="text-amber-600 w-10 h-10 cursor-pointer" onClick={() => setRating(1)} />
    //           <AiOutlineStar className="text-amber-600 w-10 h-10 cursor-pointer" onClick={() => setRating(2)} />
    //           <AiOutlineStar className="text-amber-600 w-10 h-10 cursor-pointer" onClick={() => setRating(3)} />
    //           <AiOutlineStar className="text-amber-600 w-10 h-10 cursor-pointer" onClick={() => setRating(4)} />
    //           <AiOutlineStar className="text-amber-600 w-10 h-10 cursor-pointer" onClick={() => setRating(5)} />
    //         </>
    //       )}

    //       {rating === 1 && (
    //         <>
    //           <AiFillStar className="text-amber-600 w-10 h-10 cursor-pointer" onClick={() => setRating(1)} />
    //           <AiOutlineStar className="text-amber-600 w-10 h-10 cursor-pointer" onClick={() => setRating(2)} />
    //           <AiOutlineStar className="text-amber-600 w-10 h-10 cursor-pointer" onClick={() => setRating(3)} />
    //           <AiOutlineStar className="text-amber-600 w-10 h-10 cursor-pointer" onClick={() => setRating(4)} />
    //           <AiOutlineStar className="text-amber-600 w-10 h-10 cursor-pointer" onClick={() => setRating(5)} />
    //         </>
    //       )}

    //       {rating === 2 && (
    //         <>
    //           <AiFillStar className="text-amber-600 w-10 h-10 cursor-pointer" onClick={() => setRating(1)} />
    //           <AiFillStar className="text-amber-600 w-10 h-10 cursor-pointer" onClick={() => setRating(2)} />
    //           <AiOutlineStar className="text-amber-600 w-10 h-10 cursor-pointer" onClick={() => setRating(3)} />
    //           <AiOutlineStar className="text-amber-600 w-10 h-10 cursor-pointer" onClick={() => setRating(4)} />
    //           <AiOutlineStar className="text-amber-600 w-10 h-10 cursor-pointer" onClick={() => setRating(5)} />
    //         </>
    //       )}

    //       {rating === 3 && (
    //         <>
    //           <AiFillStar className="text-amber-600 w-10 h-10 cursor-pointer" onClick={() => setRating(1)} />
    //           <AiFillStar className="text-amber-600 w-10 h-10 cursor-pointer" onClick={() => setRating(2)} />
    //           <AiFillStar className="text-amber-600 w-10 h-10 cursor-pointer" onClick={() => setRating(3)} />
    //           <AiOutlineStar className="text-amber-600 w-10 h-10 cursor-pointer" onClick={() => setRating(4)} />
    //           <AiOutlineStar className="text-amber-600 w-10 h-10 cursor-pointer" onClick={() => setRating(5)} />
    //         </>
    //       )}

    //       {rating === 4 && (
    //         <>
    //           <AiFillStar className="text-amber-600 w-10 h-10 cursor-pointer" onClick={() => setRating(1)} />
    //           <AiFillStar className="text-amber-600 w-10 h-10 cursor-pointer" onClick={() => setRating(2)} />
    //           <AiFillStar className="text-amber-600 w-10 h-10 cursor-pointer" onClick={() => setRating(3)} />
    //           <AiFillStar className="text-amber-600 w-10 h-10 cursor-pointer" onClick={() => setRating(4)} />
    //           <AiOutlineStar className="text-amber-600 w-10 h-10 cursor-pointer" onClick={() => setRating(5)} />
    //         </>
    //       )}

    //       {rating === 5 && (
    //         <>
    //           <AiFillStar className="text-amber-600 w-10 h-10 cursor-pointer" onClick={() => setRating(1)} />
    //           <AiFillStar className="text-amber-600 w-10 h-10 cursor-pointer" onClick={() => setRating(2)} />
    //           <AiFillStar className="text-amber-600 w-10 h-10 cursor-pointer" onClick={() => setRating(3)} />
    //           <AiFillStar className="text-amber-600 w-10 h-10 cursor-pointer" onClick={() => setRating(4)} />
    //           <AiFillStar className="text-amber-600 w-10 h-10 cursor-pointer" onClick={() => setRating(5)} />
    //         </>
    //       )}
    //     </div>

    //     <div className="flex flex-col justify-center align-middle items-center gap-3">
    //       <input type="text" className="w-[15rem]" value={comment} placeholder="This field can be left blank" onChange={e => setComment(e.target.value)} />
    //       <button className="bg-black text-white px-4 py-2" onClick={handleSubmit}>Submit</button>
    //     </div>

    //     <div>
    //       {product.numReviews === 0 ? <div>No reviews have been submitted for this product.</div> : (
    //         (product.reviews.map((r, index) => (
    //           <div key={index} className="flex flex-row justify-center align-middle items-center gap-2">
    //             <div>{r.rating}</div>
    //             <div>{r.comment === "" ? "No comment" : r.comment}</div>
    //           </div>
    //         )))
    //       )}
    //     </div>

    //     <div className="flex flex-row justify-center align-middle items-center gap-3">
    //       <button onClick={handleDecrement} className="bg-black text-white rounded-md px-2">-</button>
    //       <div>{quantity}</div>
    //       <button onClick={() => setQuantity(quantity + 1)} className="bg-black text-white rounded-md px-2">+</button>
    //     </div>

    //     <div className="flex flex-row justify-center align-middle items-center gap-3">
    //       <button onClick={handleAddToCart} className="bg-blue-900 hover:bg-blue-950 text-white rounded-md px-4 py-2">Add to Cart</button>
    //     </div>
    //   </div >
    // </>
  )
}

export default ProductDetails