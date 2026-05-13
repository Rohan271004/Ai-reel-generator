import { useState } from "react";
import API from "../services/api";

function Signup({ setMode }) {
    const [data, setData] = useState({
        username: "",
        password: ""
    });

    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    const handleSignup = async () => {
        await API.post("signup/", data);
        alert("Signup successful! Now login");
        setMode("login");
    };

    return (
        <div>
            <h2>Signup</h2>

            <input name="username" placeholder="Username" onChange={handleChange} />
            <input name="password" placeholder="Password" type="password" onChange={handleChange} />

            <button onClick={handleSignup}>Signup</button>

            <p onClick={() => setMode("login")}>Already have account? Login</p>
        </div>
    );
}

export default Signup;