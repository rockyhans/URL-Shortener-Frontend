import { useEffect, useState } from "react";
import API from "../api";
import { Link } from "react-router-dom";
import { PlusIcon } from "@heroicons/react/24/solid";

const Home = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    API.get("/posts").then((res) => setPosts(res.data));
  }, []);

  return (
    <div className="p-4 w-full lg:w-2/4 mx-auto font-semibold ">
      <h2 className="text-center mt-5 text-3xl font-bold ">My Feed</h2>

      <div className="max-w-2xl mx-auto mt-10">
        <Link
          to="/create"
          className="border-2 border-slate-200 bg-transparent  hover:bg-slate-200 transition-colors duration-200 w-36 text-center p-2 rounded-lg cursor-pointer font-semibold flex items-center justify-center gap-1 text-green-600 mb-5 "
        >
          <PlusIcon className="w-4 h-4 " />
          Create Post
        </Link>
        {posts.map((post) => (
          <div
            key={post._id}
            className="bg-white shadow-md rounded-lg p-4 mb-4"
          >
            <p className="text-gray-800">{post.content}</p>
            <p className="text-sm text-gray-500 mt-2">
              Posted by{" "}
              <span className="font-semibold">{post.author.name}</span> •{" "}
              {new Date(post.createdAt).toLocaleString()}
            </p>
            <p className="text-blue-600 mt-1 text-sm">
              <Link to={`/profile/${post.author._id}`}>View Profile</Link>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
