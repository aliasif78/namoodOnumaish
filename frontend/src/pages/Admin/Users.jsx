import { useGetUsersQuery, useUpdateUserProfileByIdMutation, useDeleteUserProfileByIdMutation } from "../../redux/api/userApiSlice";
import { useEffect, useState } from "react";
import { toast } from 'react-toastify'
import { RiSortAlphabetAsc, RiSortAlphabetDesc } from "react-icons/ri";
import { MdOutlineSpaceDashboard } from "react-icons/md";
import { Link } from 'react-router-dom'

const Users = () => {
    const { data: users, isLoading, isError } = useGetUsersQuery();
    const [deleteUser] = useDeleteUserProfileByIdMutation()

    const [usersCopy, setUsersCopy] = useState([])
    const [isSorted, setIsSorted] = useState(false)

    if (isLoading)
        return <div>Loading users...</div>

    if (isError)
        return <div>Error loading users...</div>

    const handleDelete = async (user) => {
        if (window.confirm("Are you sure you want to delete this user?")) {
            try {
                await deleteUser(user._id)
                toast.success("User deleted successfully.")
            }

            catch (error) {
                toast.error(error.data.message || error.error)
                console.log(error)
            }
        }
    }

    const sortAZ = () => {
        toast.info("Sorted in alphabetical Order.")

        setIsSorted(true)
        // Create a new copy of allProducts
        const sortedUsers = [...users].sort((a, b) => {
            return a.username.localeCompare(b.username, 'en', { sensitivity: 'base' });
        });

        // Update state with the sorted products
        setUsersCopy(sortedUsers);
    };

    const sortZA = () => {
        toast.info("Sorted in reverse alphabetical Order.")
        setIsSorted(true)

        // Create a new copy of allProducts
        const sortedUsers = [...users].sort((a, b) => {
            return b.username.localeCompare(a.username, 'en', { sensitivity: 'base' });
        });

        // Update state with the sorted products
        setUsersCopy(sortedUsers);
    };

    return (
        <>
            <div className="flex items-center justify-center h-screen cursor-default">
                <div className="bg-white flex flex-col w-[90%] h-[75%] -mt-[5rem] shadow-xl px-[2rem]">

                    <div className="flex flex-row h-[20%] items-center justify-between">
                        <span className="font-semibold text-neutral-700 text-2xl ml-[1rem]">Users</span>

                        <div className="flex flex-row items-end gap-5">
                            <div className="flex flex-row gap-2">
                                <RiSortAlphabetAsc onClick={sortAZ} className="bg-neutral-200 h-5 w-5 p-0.5 cursor-pointer hover:text-blue-900 transition duration-200" />
                                <RiSortAlphabetDesc onClick={sortZA} className="bg-neutral-200 h-5 w-5 p-0.5 cursor-pointer hover:text-blue-900 transition duration-200" />
                            </div>

                            <Link to='/admin/dashboard'>
                                <MdOutlineSpaceDashboard className="bg-blue-700 hover:bg-blue-900 text-white text-3xl p-1 cursor-pointer" />
                            </Link>
                        </div>
                    </div>

                    <table className="w-full flex flex-col justify-between border-[2px] h-[70%] overflow-y-auto">
                        <thead className="flex flex-row justify-start text-neutral-500 text-sm border-b-2 p-2 bg-[#f0f0f3]">
                            <th className="font-semibold w-[10%]">Index</th>
                            <th className="font-semibold w-[40%]">ID</th>
                            <th className="font-semibold w-[40%]">Username</th>
                            <th className="font-semibold w-[40%]">Email</th>
                            <th className="font-semibold w-[10%]">Actions</th>
                        </thead>

                        {(!isSorted ? users : usersCopy).map((u, index) => (
                            <tr key={u._id} className="flex flex-row px-2 border-b-[1.5px] justify-center align-middle">
                                <td className="w-[10%] flex flex-row justify-center">{index + 1}</td>
                                <td className="w-[40%] flex flex-row justify-center px-4">{u._id}</td>
                                <td className="w-[40%] flex flex-row justify-center px-4">{u.username}</td>
                                <td className="w-[40%] flex flex-row justify-center px-4">{u.email}</td>

                                <td className="w-[10%] flex flex-row gap-2 justify-center px-4">
                                    <lord-icon
                                        class="cursor-pointer"
                                        onClick={() => handleDelete(u)}
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
            </div >
        </>
    );
};

export default Users;
