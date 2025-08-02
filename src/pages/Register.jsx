import { useState } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    bio: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/auth/register", form);
      alert("Registered successfully");
      navigate("/login");
    } catch (err) {
      alert(err.response?.data?.error || "Registration failed");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-2xl shadow-md w-full max-w-md flex flex-col items-center justify-center gap-4"
      >
        <h2 className="text-3xl font-bold mb-2 text-blue-700">Register</h2>
        <p className="text-gray-600 text-sm mb-4 text-center">
          Create your account to join the community
        </p>

        <input
          name="name"
          placeholder="Full Name"
          className="w-4/5 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          onChange={handleChange}
          required
        />
        <input
          name="email"
          type="email"
          placeholder="Email"
          className="w-4/5 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          onChange={handleChange}
          required
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          className="w-4/5 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          onChange={handleChange}
          required
        />
        <input
          name="bio"
          placeholder="Short Bio"
          className="w-4/5 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          onChange={handleChange}
        />

        <button
          type="submit"
          className="w-4/5 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded shadow transition duration-200"
        >
          Register
        </button>

        <p className="text-sm text-gray-500 mt-2">
          Already have an account?{" "}
          <span
            className="text-blue-600 hover:underline cursor-pointer"
            onClick={() => navigate("/login")}
          >
            Login
          </span>
        </p>
      </form>
    </div>
  );
};

export default Register;
