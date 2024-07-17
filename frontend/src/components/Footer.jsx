import { AiFillInstagram, AiOutlineWhatsApp, AiFillFacebook, AiFillLinkedin } from "react-icons/ai"
import { SiGmail } from "react-icons/si";

const Footer = () => {
    return (
        <div className="h-fit w-full bg-neutral-900 text-white flex flex-col gap-3 justify-center align-middle pt-[2rem] text-center items-center mt-[7rem]">
            <h1 className="text-xl">Namood o Numaish</h1>

            <div>
                <p className="text-neutral-400 text-xs">Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum, fugiat?</p>
                <p className=" text-xs text-neutral-400">Icons by: lordicon.com</p>
            </div>

            <div className="flex flex-row gap-3 mt-[1rem]">
                <button><AiFillFacebook className="size-5" /></button>
                <button><AiFillInstagram className="size-5" /></button>
                <button><AiFillLinkedin className="size-5" /></button>
                <button><AiOutlineWhatsApp className="size-5" /></button>
                <button><SiGmail className="size-5" /></button>
            </div>

            <div className="flex flex-row justify-center bg-black h-fit w-full py-2 mt-[1rem] text-xs text-neutral-400">Copyright &#169;2024. All rights Reserved.</div>
        </div>
    )
}

export default Footer