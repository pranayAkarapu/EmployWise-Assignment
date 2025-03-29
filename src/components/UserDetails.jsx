import "../styles/userdetails.css"

function UserDetails({user, editingUser, setEditingUser, updatedUser, setUpdatedUser, handleDelete, handleEdit, handleUpdate}){
    return(
        <div className="user-Card">
            {/* Displaying user avatar */}
            <img src={user.avatar} alt={user.first_name} className="avatar" />
            {editingUser===user.id?(
                <div>

                    {/* Input fields for updating user details */}
                    <input type="text"
                    name="first_name"
                    value={updatedUser.first_name}
                    onChange={(e)=>setUpdatedUser({...updatedUser, first_name:e.target.value})}
                    />
                    <input type="text"
                    name="last_name"
                    value={updatedUser.last_name}
                    onChange={(e)=>setUpdatedUser({...updatedUser, last_name:e.target.value})}
                    />
                    <input type="email"
                    name="email"
                    value={updatedUser.email}
                    onChange={(e)=>setUpdatedUser({...updatedUser, email:e.target.value})}
                    />

                    {/* Buttons to save changes or cancel editing */}
                    <button onClick={()=>handleUpdate(user.id)}>Save</button>
                    <button onClick={()=>setEditingUser(null)}>Cancel</button>
                </div>
            ):(
                <div>
                    {/* Display user details when not in edit mode */}
                    <h2>{user.first_name} {user.last_name}</h2>
                    <p>Email: {user.email}</p>
                    
                    {/* Buttons to trigger edit or delete actions */}
                    <button onClick={()=>handleEdit(user)}>Edit</button>
                    <button onClick={()=>handleDelete(user.id)}>Delete</button>
                </div>
            )}
        </div>
    )
}

export default UserDetails;