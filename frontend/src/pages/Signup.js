import { useState } from "react"; 
import { useNavigate } from "react-router-dom"; 
import axios from "axios"; 
function Signup() { 
const [form, setForm] = useState({ username: "", password: "" }); 
const navigate = useNavigate(); 
const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value }); 
const handleSubmit = async (e) => { 
e.preventDefault(); 
try { 
await axios.post("http://localhost:5000/signup", form); 
alert("Account created!"); 
navigate("/"); 
} catch { 
alert("Username already exists"); 
} 
}; 
return ( 
<form className="card" onSubmit={handleSubmit}> 
<h2>Sign Up</h2> 
<input name="username" placeholder="Choose Username" onChange={handleChange} required /> 
<input type="password" name="password" placeholder="Choose Password" onChange={handleChange} required /> 
<button type="submit">Create Account</button> 
</form> 
); 
} 
export default Signup;
