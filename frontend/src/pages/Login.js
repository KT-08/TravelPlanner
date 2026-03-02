import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
function Login({ setUsername }) {
    const [form, setForm] = useState({ username: "", password: "" });
    const navigate = useNavigate();
    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:5000/login", form);
            setUsername(form.username);
            localStorage.setItem("username", form.username); // persist
            navigate("/tripform");
        } catch {
            alert("Invalid credentials");
        }
    };
    return (
        <form className="card" onSubmit={handleSubmit}>
            <h2>Login</h2>
            <input name="username" placeholder="Username" onChange={handleChange} required />
            <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
            <button type="submit">Login</button>
            <p>
                Don't have an account? <Link to="/signup">Sign Up</Link>
            </p>
        </form>
    );
}
export default Login;
