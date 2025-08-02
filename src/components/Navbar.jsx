import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const Navbar = () => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    navigate("/login");
  };

  useEffect(() => {
    const handleStorageChange = () => setToken(localStorage.getItem("token"));
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  return (
    <>
      <nav className="bg-white shadow-md py-4 px-6 flex justify-between items-center">
        <div className="text-xl font-bold text-blue-600">
          <Link to="/">Home</Link>
        </div>
        <div className="space-x-4 text-gray-700 font-semibold ">
          <Link
            to="/preview"
            className="w-36   
             p-2 text-lg font-semibold rounded-lg border-2 border-slate-400 
             text-green-600 bg-transparent hover:text-black-500 
             hover:bg-slate-400 transition-colors duration-200"
          >
            Preview
          </Link>

          {!token ? (
            <>
              <Link to="/login" className="hover:text-green-500">
                Login
              </Link>
              <Link to="/register" className="hover:text-green-500">
                Register
              </Link>
            </>
          ) : (
            <>
              <Link to="/create" className="hover:text-blue-500">
                Create Post
              </Link>
              <button
                onClick={logout}
                className="text-red-500 hover:underline ml-2"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </nav>
      <hr className="border-gray-200" />
    </>
  );
};

export default Navbar;
