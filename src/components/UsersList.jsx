import { useState, useEffect } from "react"
import UserDetails from "./UserDetails";
import "../styles/userList.css"

function UsersList(){
    // State variables for managing users, pagination, and editing user data
    const [users, setUsers] = useState([])
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [editingUser, setEditingUser] = useState(null);
    const [updatedUser, setUpdatedUser] = useState({first_name:"", last_name:"",email:""});

    // Fetch users whenever the page number changes
    useEffect(()=>{
        fetchUsers(page);
    },[page]);

    // Function to fetch users from the API
    const fetchUsers = async(page)=>{

        // Checking for authentication token
        const token = localStorage.getItem("token");
        if(!token){
            alert("Please login first");
            return;
        }

        try{
            const response = await fetch(`https://reqres.in/api/users?page=${page}`);
            const data = await response.json();
            if(!data || !data.data){
                console.error(data);
                return;
            }
            setUsers(data.data || []);
            setTotalPages(data.total_pages)
        }catch(error){
            console.log("Error fetching users", error);
        }
    }

    // Function to enable edit mode for a user
    const handleEdit = (user)=>{
        setEditingUser(user.id);
        setUpdatedUser({
            first_name:user.first_name,
            last_name:user.last_name,
            email:user.email
        });
    }

    // Function to update user details
    const handleUpdate = async(id)=>{
        try{
            const response = await fetch(`https://reqres.in/api/users/${id}`, {
                method: "PUT",
                headers: {"Content-Type":"application/json"},
                body: JSON.stringify(updatedUser)
            });
            if(response.ok){
                alert("User updated successfully");
                setUsers(users.map(user=> (user.id===id ?{...user, ...updatedUser}:user)));
                setEditingUser(null);
            }else{
                alert("Failed to update User.");
            }
        }catch(error){
            console.log("Error updating user", error);
        }
    }

    // Function to delete a user
    const handleDelete = async(id)=>{
        try{
            const response = await fetch(`https://reqres.in/api/users/${id}`, {method:"DELETE"});
            if(response.ok){
                alert("User deleted successfully");
                setUsers(prevUsers => {
                    const updatedUsers = prevUsers.filter(user => user.id !== id)
                    return updatedUsers;
                });
            }else{
                alert("Failed to delete User");
            }
        }catch(error){
            console.log("Error deleting user", error);
        }
    }

    return(
        <div className="container">
            <h1 className="header">Users List</h1>
            {/* Display user details */}
            <div  className="user">
                {users.map((user)=>(
                    <UserDetails
                        key={user.id}
                        user={user}
                        editingUser={editingUser}
                        setEditingUser = {setEditingUser}
                        updatedUser = {updatedUser}
                        setUpdatedUser = {setUpdatedUser}
                        handleEdit = {handleEdit}
                        handleUpdate = {handleUpdate}
                        handleDelete = {handleDelete}
                    />
                ))}
            </div>
            
            {/* Pagination controls */}
            <div className="pagination">
                <button disabled={page==1} onClick={()=>setPage(page-1)}>Prev</button>
                <span>Page {page} of {totalPages}</span>
                <button disabled={page==totalPages} onClick={()=>setPage(page+1)}>Next</button>
            </div>
        </div>
    )
}

export default UsersList;