import { useState, useEffect } from "react";
import axios from "axios";

const AdminGroup = () => {
  const [group, setGroup] = useState(null);
  const [form, setForm] = useState({ groupName: "", description: "" });
  const [postText, setPostText] = useState("");
  const [posts, setPosts] = useState([]);
  const [postFile, setPostFile] = useState(null);

  const fetchGroup = async () => {
    const res = await axios.get("http://localhost:5000/group/my-group", {
      withCredentials: true,
    });
    setGroup(res.data);
    if (res.data) fetchPosts();
  };

  const fetchPosts = async () => {
    const res = await axios.get("http://localhost:5000/group/posts", {
      withCredentials: true,
    });
    setPosts(res.data);
  };

  const createGroup = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:5000/group/create-group", form, {
      withCredentials: true,
    });
    fetchGroup();
  };

  const createPost = async () => {
    if (!postText.trim()) {
      alert("Post content is required!");
      return;
    }

    const formData = new FormData();
    formData.append("content", postText); // this was missing or empty
    if (postFile) {
      formData.append("media", postFile);
    }

    try {
      await axios.post("http://localhost:5000/group/post", formData, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setPostText("");
      setPostFile(null);
      fetchPosts();
    } catch (err) {
      console.error("Error creating post:", err);
    }
  };

  const deletePost = async (id) => {
    await axios.delete(`http://localhost:5000/group/post/${id}`, {
      withCredentials: true,
    });
    fetchPosts();
  };

  useEffect(() => {
    fetchGroup();
  }, []);

  return (
    <div className="p-4">
      {!group ? (
        <form onSubmit={createGroup} className="space-y-2">
          <h2 className="text-xl font-bold">Create Your Group</h2>
          <input
            placeholder="Group Name"
            name="groupName"
            onChange={(e) => setForm({ ...form, groupName: e.target.value })}
            required
          />
          <input
            placeholder="Description"
            name="description"
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            required
          />
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded"
            type="submit"
          >
            Create Group
          </button>
        </form>
      ) : (
        <>
          <h2 className="text-xl font-bold mb-2">Group: {group.groupName}</h2>
          <textarea
            value={postText}
            onChange={(e) => setPostText(e.target.value)}
            placeholder="Write post..."
            className="w-full p-2 border"
          />
          <textarea
  value={postText}
  onChange={(e) => setPostText(e.target.value)}
  placeholder="Write something about your post..."
  className="w-full p-2 border rounded my-2"
/>
          <input
            type="file"
            accept="image/*,video/*"
            onChange={(e) => setPostFile(e.target.files[0])}
            className="my-2"
          />
          <button
            className="bg-green-500 text-white px-4 py-2 mt-2 rounded"
            onClick={createPost}
          >
            Create Post
          </button>
          <div className="mt-4 space-y-2">
            {posts.map((p) => (
              <div key={p._id} className="border p-3 rounded">
                <p>{p.content}</p>
                <p className="text-sm text-gray-600">Likes: {p.likes}</p>
                <button
                  onClick={() => deletePost(p._id)}
                  className="text-red-600 text-sm"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default AdminGroup;
