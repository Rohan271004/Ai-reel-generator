import { useState } from "react";
import API from "../services/api";

function Login({ setToken }) {
    const [data, setData] = useState({
        username: "",
        password: ""
    });

    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    const handleLogin = async () => {
        const res = await API.post("token/", data);

        localStorage.setItem("token", res.data.access);
        setToken(res.data.access);

        alert("Login successful!");
    };

    return (
        <div>
            <h2>Login</h2>

            <input name="username" onChange={handleChange} />
            <input name="password" type="password" onChange={handleChange} />

            <button onClick={handleLogin}>Login</button>
        </div>
    );
}

export default Login;