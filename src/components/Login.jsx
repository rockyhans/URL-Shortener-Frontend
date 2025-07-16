import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./cssPage.css";

const Login = () => {
  const [form, setForm] = useState({ username: "", password: "" });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/auth/login", form, {
        withCredentials: true,
      });
      if (res.data.role === "admin") navigate("/admin");
      else navigate("/user");
    } catch (err) {
      console.error(err);
      setMessage(err.response?.data?.message || "Login failed.");
    }
  };

  return (
    <div className="p-2 max-w-md  loginPage   ">
      {/* <h2 className=" font-bold mb-1 ">Login</h2> */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <input
          type="text"
          name="username"
          placeholder="Username"
          className="p-2  "
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="p-2 "
          onChange={handleChange}
          required
        />
        <button className=" text-white p-2 rounded mt-2 w-50 " type="submit">
          Login
        </button>
      </form>
      <p className="mt-4 text-red-600">{message}</p>
    </div>
  );
};

export default Login;
