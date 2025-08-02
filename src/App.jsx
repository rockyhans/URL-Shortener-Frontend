import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useState, useEffect } from "react";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";
import CreatePost from "./pages/CreatePost";
import Profile from "./pages/Profile";
import PrivateRoute from "./components/PrivateRoute";
import NotFound from "./pages/NotFound";
import Navbar from "./components/Navbar";
import Preview from "./pages/Preview";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
  };

  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login setToken={setToken} />} />
          <Route
            path="/create"
            element={
              <PrivateRoute>
                <CreatePost />
              </PrivateRoute>
            }
          />
          <Route path="/profile/:id" element={<Profile />} />
            <Route path="/preview" element={<Preview />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
