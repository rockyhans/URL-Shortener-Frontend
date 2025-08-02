import { useState } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/auth/login", form);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      navigate("/");
    } catch (err) {
      alert(err.response?.data?.error || "Login failed");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-2xl shadow-md w-full max-w-md flex flex-col items-center justify-center gap-4"
      >
        <h2 className="text-3xl font-bold mb-2 text-blue-700">Login</h2>

        <input
          name="email"
          placeholder="Email"
          className="w-4/5 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          onChange={handleChange}
          required
        />
        <input
          name="password"
          type="password"
          className="w-4/5 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Password"
          onChange={handleChange}
          required
        />
        <button
          type="submit"
          className="w-4/5 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded shadow transition duration-200"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
