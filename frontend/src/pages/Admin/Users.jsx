import { useGetUsersQuery, useUpdateUserProfileByIdMutation, useDeleteUserProfileByIdMutation } from "../../redux/api/userApiSlice";
import { useEffect, useState } from "react";
import { AiOutlineEdit, AiOutlineSave, AiOutlineDelete } from 'react-icons/ai'
import { toast } from 'react-toastify'

const Users = () => {
    const { data: users, refetch, isLoading, error } = useGetUsersQuery();
    const [updateUser] = useUpdateUserProfileByIdMutation()
    const [deleteUser] = useDeleteUserProfileByIdMutation()

    const [editableUserId, setEditableUserId] = useState('')
    const [editableUsername, setEditableUsername] = useState('')

    useEffect(() => {
        refetch();
    }, [refetch]);

    const handleEdit = (user) => {
        setEditableUserId(user._id)
        setEditableUsername(user.username)
    }

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

    const handleSave = async (user) => {

        try {
            // Save the updated username in the database
            await updateUser({ userId: user._id, username: editableUsername, email: user.email })
            setEditableUserId('')
            setEditableUsername('')
            refetch()
            toast.success("User updated successfully.")
        }

        catch (error) {
            toast.error(error.data.message || error.error)
            console.log(error)
        }

    }

    return (
        <div className="flex flex-col mt-[2rem] justify-center w-full h-full items-center">
            {isLoading && <p>Loading...</p>}
            {/* {error && (
                <div>
                    <p>Error fetching users:</p>
                    <pre>{JSON.stringify(error, null, 2)}</pre>
                </div>
            )} */}

            <h1 className="text-4xl font-semibold mb-10">Users</h1>

            <div className="flex flex-col justify-center">
                {users && users.map((user, i) => (
                    <div key={user._id} className="flex flex-row gap-10">
                        <p>{i}.</p>

                        {editableUserId === user._id ? (
                            <input type="text" value={editableUsername} onChange={e => setEditableUsername(e.target.value)} className="w-12 h-fit" />
                        ) : (
                            <p>{user.username}</p>
                        )}

                        <p>{user.email}</p>

                        {editableUserId !== user._id ?
                            (
                                <AiOutlineEdit className="cursor-pointer text-cyan-700" onClick={() => handleEdit(user)} />
                            ) : (
                                <AiOutlineSave className="cursor-pointer text-cyan-700" onClick={() => handleSave(user)} />
                            )
                        }

                        <AiOutlineDelete className="cursor-pointer text-cyan-700" onClick={() => handleDelete(user)} />
                    </div>
                ))}
            </div>
        </div >
    );
};

export default Users;
