import { useState } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";

const CreatePost = () => {
  const [content, setContent] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/posts", { text: content });
      navigate("/");
    } catch (err) {
      alert(err.response?.data?.error || "Error creating post");
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 bg-white p-8 rounded-xl shadow-lg">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
        ✍️ Create a New Post
      </h2>
      <form onSubmit={handleSubmit} className=" ">
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="What's on your mind?"
          required
          rows={6}
          className="w-full p-4 border border-gray-300 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
        />
        <button
          type="submit"
          className="mt-4 w-1/2 bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-md transition "
        >
          Post
        </button>
      </form>
    </div>
  );
};

export default CreatePost;
