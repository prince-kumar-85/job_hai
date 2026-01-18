import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [role, setRole] = useState("user"); // default user
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async () => {
    try {
      const url =
        role === "admin"
          ? "/admin/login"
          : "/user/login";

      const res = await api.post(url, form);

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.user.role);

      if (res.data.user.role === "admin") {
        navigate("/admin/dashboard");
      } else {
        navigate("/user/dashboard");
      }
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>

      <input
        type="email"
        name="email"
        placeholder="Email"
        onChange={handleChange}
      />

      <input
        type="password"
        name="password"
        placeholder="Password"
        onChange={handleChange}
      />

      <div style={{ marginTop: "10px" }}>
        <button onClick={() => { setRole("user"); handleLogin(); }}>
          Login as User
        </button>

        <button
          style={{ marginLeft: "10px" }}
          onClick={() => { setRole("admin"); handleLogin(); }}
        >
          Login as Admin
        </button>
      </div>
    </div>
  );
}
