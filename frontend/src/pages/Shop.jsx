
const Shop = () => {
    return (
        <>
            <div className="flex flex-row w-full p-[1rem] sm:p-[3rem] justify-center gap-[2rem]">
                <section className="bg-white sticky top-[5.25rem] sm:top-[7.5rem] lg:top-[8rem] left-0 flex flex-col gap-[1.5rem] text-black p-[1rem] h-fit w-[40%] lg:w-[20%]">
                    <div className="flex flex-col gap-1">
                        <h3 className="font-light mb-1">Category</h3>

                        <div className="flex flex-row gap-2 text-sm">
                            <input type="checkbox" />
                            <span>Adults</span>
                        </div>

                        <div className="flex flex-row gap-2 text-sm">
                            <input type="checkbox" />
                            <span>Kids</span>
                        </div>

                        <div className="flex flex-row gap-2 text-sm">
                            <input type="checkbox" />
                            <span>Arts & Craft</span>
                        </div>
                    </div>

                    <span className="bg-neutral-300 h-[1px] w-full"></span>

                    <div className="flex flex-col gap-2">
                        <h3 className="font-light hidden sm:block">Price Range</h3>
                        <h3 className="font-light sm:hidden">Price</h3>

                        <div className="flex flex-row gap-2 text-sm items-center w-full">
                            <div className="flex flex-col gap-1 w-[45%]">
                                <label htmlFor="price" className="text-xs neutral-400">Min</label>
                                <input type="number" className="bg-neutral-200 rounded-sm pl-2 py-1 text-sm" />
                            </div>

                            <span className="mt-3">-</span>

                            <div className="flex flex-col gap-1 w-[45%]">
                                <label htmlFor="price" className="text-xs neutral-400">Max</label>
                                <input type="number" className="bg-neutral-200 rounded-sm pl-2 py-1 text-sm" />
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col gap-2 w-full">
                        <button className="bg-black border-[2px] border-black text-white hover:bg-neutral-700 py-2 transition duration-200">Apply</button>
                        <button className="bg-white border-[2px] border-black text-black hover:bg-[#6B7C65] hover:border-[#6B7C65] hover:text-white py-2 transition duration-200">Clear Filters</button>
                    </div>
                </section>

                <section>
                    <div class="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-[1rem]">
                        <div className="card flex flex-col justify-center text-center w-fit h-fit">
                            <img src="https://www.vsurfaces.com/cdn/shop/files/autumn-spice-465269.jpg?v=1717152558&width=360" alt="img" className='w-[13rem] h-[18rem] transition-transform duration-300 ease-in-out transform hover:scale-105' />

                            <div className='mt-3'>Autumn Spice</div>
                            <div className='text-sm'>Rs. 1,800</div>
                        </div>

                        <div className="card flex flex-col justify-center text-center w-fit h-fit">
                            <img src="https://www.vsurfaces.com/cdn/shop/files/royal-oud-166428.jpg?v=1717153202&width=360" alt="img" className='w-[13rem] h-[18rem] transition-transform duration-300 ease-in-out transform hover:scale-105' />

                            <div className='mt-3'>Royal Oud</div>
                            <div className='text-sm'>Rs. 1,750</div>
                        </div>

                        <div className="card flex flex-col justify-center text-center w-fit h-fit">
                            <img src="https://www.vsurfaces.com/cdn/shop/files/self-love-622771.jpg?v=1717153396&width=360" alt="img" className='w-[13rem] h-[18rem] transition-transform duration-300 ease-in-out transform hover:scale-105' />

                            <div className='mt-3'>Self Love</div>
                            <div className='text-sm'>Rs. 2,199</div>
                        </div>

                        <div className="card flex flex-col justify-center text-center w-fit h-fit">
                            <img src="https://www.vsurfaces.com/cdn/shop/files/vanilla-affair-182721.jpg?v=1717154931&width=360" alt="img" className='w-[13rem] h-[18rem] transition-transform duration-300 ease-in-out transform hover:scale-105' />

                            <div className='mt-3'>Vanilla Affair</div>
                            <div className='text-sm'>Rs. 1,500</div>
                        </div>
                        
                        <div className="card flex flex-col justify-center text-center w-fit h-fit">
                            <img src="https://www.vsurfaces.com/cdn/shop/files/jbr-231454.jpg?v=1717153084&width=360" alt="img" className='w-[13rem] h-[18rem] transition-transform duration-300 ease-in-out transform hover:scale-105' />

                            <div className='mt-3'>Pearl Matte</div>
                            <div className='text-sm'>Rs. 2,200</div>
                        </div>

                        <div className="card flex flex-col justify-center text-center w-fit h-fit">
                            <img src="https://www.vsurfaces.com/cdn/shop/files/pack-of-5-candles-save-20-746848.jpg?v=1717153179&width=540" alt="img" className='w-[13rem] h-[18rem] transition-transform duration-300 ease-in-out transform hover:scale-105' />

                            <div className='mt-3'>Coffee Beans</div>
                            <div className='text-sm'>Rs. 1,560</div>
                        </div>

                        <div className="card flex flex-col justify-center text-center w-fit h-fit">
                            <img src="https://www.vsurfaces.com/cdn/shop/files/autumn-spice-371163.jpg?v=1717152558&width=540" alt="img" className='w-[13rem] h-[18rem] transition-transform duration-300 ease-in-out transform hover:scale-105' />

                            <div className='mt-3'>Winter Chills</div>
                            <div className='text-sm'>Rs. 1,750</div>
                        </div>

                        <div className="card flex flex-col justify-center text-center w-fit h-fit">
                            <img src="https://www.vsurfaces.com/cdn/shop/files/royal-oud-228532.jpg?v=1717153202&width=540" alt="img" className='w-[13rem] h-[18rem] transition-transform duration-300 ease-in-out transform hover:scale-105' />

                            <div className='mt-3'>Ombre Leather</div>
                            <div className='text-sm'>Rs. 3,150</div>
                        </div>
                    </div>
                </section>
            </div>
        </>
    )
}

export default Shop