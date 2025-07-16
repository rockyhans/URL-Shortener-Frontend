import { useState } from "react";
import Login from "../components/Login";
import "./firstPage.css"; // Custom styles if any
import { useNavigate } from "react-router-dom";

function Firstpage() {
  const [page, setPage] = useState(null);
  const navigate = useNavigate();

  return (
    <div className="firstPage">
      <div className="d-flex justify-content-center align-items-center vh-100 bg-light flex-column bg-purple-500 div1">
        <h1 className=" text-primary fw-bold">🎓 College Memes</h1>
        {/* Conditionally show <p> only if not in login page or register route */}
        {!page && location.pathname !== "/register" && <p className="hhh">🤩</p>}{" "}
        {!page && (
          <div className="d-flex w-100 fine">
            <button className="btn px-4 py-2" onClick={() => setPage("login")}>
              Login
            </button>
            <button
              className="btn px-4 py-2 ms-5"
              onClick={() => navigate("/register")}
            >
              Sign Up
            </button>
          </div>
        )}
        {page === "login" && (
          <div className="form-container ">
            <Login />
            <button
              className="btn btn-link splcolor"
              onClick={() => setPage(null)}
            >
              🔙
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Firstpage;
