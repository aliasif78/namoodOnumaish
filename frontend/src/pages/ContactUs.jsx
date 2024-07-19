const ContactUs = () => {
    return (
        <div className="flex flex-col w-full justify-center items-center mt-[1.25rem] gap-[3rem]">
            <div className="flex flex-col gap-3 w-full items-center">
                <span className="text-4xl font-semibold">Contact Us</span>
                <span>Have any questions? We'd love to hear from you.</span>
            </div>

            <div className="flex flex-col sm:flex-row gap-[2rem] w-[90%] lg:w-[70%] h-full items-center sm:justify-around">
                <div className="card flex flex-col justify-between rounded-2xl border-t-8 border-pink-400 bg-white shadow-2xl h-[18rem] w-[60%] sm:w-[30%] p-[2rem] mt-[1.5rem]">
                    <div className="flex flex-col gap-[1rem]">
                        <span className="text-xl font-semibold">Instagram</span>
                        <p className="text-xs lg:text-sm text-neutral-500">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Pariatur consectetur asperiores harum laborum expedita voluptatum?</p>
                    </div>

                    <button className="rounded-full border-[2px] text-sm font-semibold border-pink-400 text-pink-600 hover:bg-pink-400 hover:text-white transition duration-200 mt-[1rem] px-4 py-2">Message</button>
                </div>

                <div className="card flex flex-col justify-between rounded-2xl border-t-8 border-green-400 bg-white shadow-2xl h-[21rem] w-[60%] sm:w-[30%] p-[2rem]">
                    <div className="flex flex-col gap-[1rem]">
                        <span className="text-xl font-semibold">Whatsapp</span>
                        <p className="text-xs lg:text-sm text-neutral-500">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Pariatur consectetur asperiores harum laborum expedita voluptatum?</p>
                    </div>

                    <button className="rounded-full border-[2px] text-sm font-semibold bg-green-500 text-white border-green-500 hover:text-green-600 hover:bg-white transition duration-200 mt-[1rem] px-4 py-2">Contact</button>
                </div>

                <div className="card flex flex-col justify-between rounded-2xl border-t-8 border-red-400 bg-white shadow-2xl h-[18rem] w-[60%] sm:w-[30%] p-[2rem] mt-[1.5rem]">
                    <div className="flex flex-col gap-[1rem]">
                        <span className="text-xl font-semibold">Gmail</span>
                        <p className="text-xs lg:text-sm text-neutral-500">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Pariatur consectetur asperiores harum laborum expedita voluptatum?</p>
                    </div>

                    <button className="rounded-full border-[2px] text-sm font-semibold border-red-400 text-red-600 hover:bg-red-400 hover:text-white transition duration-200 mt-[1rem] px-4 py-2">Email</button>
                </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-[2rem] w-[90%] sm:w-[70%] lg:w-[50%] h-full items-center sm:justify-around">
                <div className="card flex flex-col justify-between rounded-2xl border-t-8 border-blue-600 bg-white shadow-2xl h-[18rem] w-[60%] sm:w-[43%] p-[2rem] mt-[1.5rem]">
                    <div className="flex flex-col gap-[1rem]">
                        <span className="text-xl font-semibold">Facebook</span>
                        <p className="text-xs lg:text-sm text-neutral-500">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Pariatur consectetur asperiores harum laborum expedita voluptatum?</p>
                    </div>

                    <button className="rounded-full border-[2px] text-sm font-semibold border-blue-600 text-blue-800 hover:bg-blue-600 hover:text-white transition duration-200 mt-[1rem] px-4 py-2">Message</button>
                </div>

                <div className="card flex flex-col justify-between rounded-2xl border-t-8 border-orange-400 bg-white shadow-2xl h-[18rem] w-[60%] sm:w-[43%] p-[2rem] mt-[1.5rem]">
                    <div className="flex flex-col gap-[1rem]">
                        <span className="text-xl font-semibold">Phone Call</span>
                        <p className="text-xs lg:text-sm text-neutral-500">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Pariatur consectetur asperiores harum laborum expedita voluptatum?</p>
                    </div>

                    <button className="rounded-full border-[2px] text-sm font-semibold border-orange-400 text-orange-600 hover:bg-orange-400 hover:text-white transition duration-200 mt-[1rem] px-4 py-2">Call</button>
                </div>
            </div>
        </div>
    )
}

export default ContactUs