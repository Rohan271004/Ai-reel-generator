import { useState } from "react";
import API from "../services/api";

function Login({ onLogin }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const loginUser = async () => {
        try {
            const res = await API.post("token/", {
                username,
                password,
            });

            localStorage.setItem("access", res.data.access);
            localStorage.setItem("refresh", res.data.refresh);

            onLogin();
        } catch (err) {
            console.log(err);
            alert("Login failed");
        }
    };

    return (
        <div className="text-white p-6">
            <h1>Login</h1>

            <input placeholder="username" onChange={(e) => setUsername(e.target.value)} />
            <input placeholder="password" type="password" onChange={(e) => setPassword(e.target.value)} />

            <button onClick={loginUser}>Login</button>
        </div>
    );
}

export default Login;