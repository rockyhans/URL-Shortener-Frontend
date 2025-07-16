import { useState } from "react";
import axios from "axios";
import "./cssPage.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();

  const [role, setRole] = useState("user");
  const [form, setForm] = useState({
    name: "",
    email: "",
    username: "",
    college: "",
    rollNumber: "",
    branch: "",
    year: "",
    password: "",
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "http://localhost:5000/auth/register",
        { ...form, role },
        { withCredentials: true }
      );
      setMessage(
        "Registered successfully! Please wait for approval if you’re a user."
      );
    } catch (err) {
      console.error(err);
      setMessage("Registration failed.");
    }
  };

  return (
    <div className="ragisterPage">
      <div className=" div2  ">
        <h2 className="text-3xl font-bold mb-4">Register as {role}</h2>
        <div className="flex mb-4">
          <button
            className={`mr-2 ps-4 pe-4 border rounded-xl ${
              role === "user" && "bg-gray-300"
            }`}
            onClick={() => setRole("user")}
          >
            User
          </button>
          <button
            className={`p-2 border rounded-xl ${
              role === "admin" && "bg-gray-300"
            }`}
            onClick={() => setRole("admin")}
          >
            Admin
          </button>
          <button className="btn btn-link text-2xl ms-5  " onClick={() => navigate("/")}>
          🔙
        </button>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-2">
          {role === "admin" && (
            <input
              type="text"
              name="name"
              placeholder="Name"
              onChange={handleChange}
              required
            />
          )}
          <div>
            <input
              type="email"
              name="email"
              placeholder="Email"
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="username"
              placeholder="Username"
              onChange={handleChange}
              required
            />
          </div>
          <input
            type="text"
            name="college"
            placeholder="College"
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="rollNumber"
            placeholder="Roll Number"
            onChange={handleChange}
            required
          />
          {role === "admin" && (
            <>
              <input
                type="text"
                name="branch"
                placeholder="Branch"
                onChange={handleChange}
              />
              <input
                type="text"
                name="year"
                placeholder="Year"
                onChange={handleChange}
                required
              />
            </>
          )}
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            required
          />
          <button
            className=" text-white p-2 rounded mt-2 w-50 buttons"
            type="submit"
          >
            Register
          </button>
          
        </form>
        <p className="mt-4 text-green-600">{message}</p>
        {/* <button className="btn btn-link" onClick={() => navigate("/")}>
          🔙 Return to Home
        </button> */}
        
      </div>
    </div>
  );
};

export default Register;
