import { useState } from "react";
import "../styles/login.css";
import { Outlet, useNavigate } from "react-router-dom";

function Login(){
    // State variables to manage user input and error messages
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const navigate = useNavigate();

    // Function to handle form submission
    const handleSubmit = async(e)=>{
        e.preventDefault();
        
        const response = await fetch("https://reqres.in/api/login",{
            method:"POST",
            headers:{"Content-Type": "application/json"},
            body:JSON.stringify({email,password})
        });
        const data = await response.json();
        if(response.ok){
            // Store the authentication token in localStorage
            localStorage.setItem("token",data.token);

            // Fetch the list of users after successful login
            const usersResponse = await fetch("https://reqres.in/api/users?page=1");
            const usersData = await usersResponse.json();
            if (usersData.data) {
                // Redirect to the users page
                navigate("/users");
            } else {
                alert("User data not available!");
            }
        }else{
            setError(data.error || "Invalid Credentials");
        }
    }

    return(
        <div className="container">
            <h1 className="header">Welcome Back! Please Login to Continue</h1>
            {error && <p className="error">{error}</p>}
            <form className="form" method="POST" onSubmit={handleSubmit}>
                <label htmlFor="email" className="label">Email:</label>
                <input type="email" id="email" name="email" value={email}
                 className="input" onChange={(e)=>setEmail(e.target.value)} autoComplete="email" required/>
                <br/>
                <label htmlFor="password" className="label">Password:</label>
                <input type="password" id="password" name="password"
                 value={password} className="input" onChange={(e)=>setPassword(e.target.value)} autoComplete="current-password" required/>
                <br/>
                <button type="submit" className="button">Login</button>
            </form>
            <Outlet/>
        </div>
    )
}
export default Login;