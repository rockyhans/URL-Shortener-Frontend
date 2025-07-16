import { useEffect, useState } from "react";
import axios from "axios";

const AdminDashboard = () => {
  const [pendingUsers, setPendingUsers] = useState([]);
  const [group, setGroup] = useState(null);
  const [groupName, setGroupName] = useState('');
  const [groupDescription, setGroupDescription] = useState('');
  const [posts, setPosts] = useState([]);
  const [postText, setPostText] = useState('');
  const [postFile, setPostFile] = useState(null);

  // Fetch pending users
  const fetchPending = async () => {
    try {
      const res = await axios.get("http://localhost:5000/admin/pending-users", {
        withCredentials: true,
      });
      setPendingUsers(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  // Approve a user
  const approveUser = async (id) => {
    await axios.put(`http://localhost:5000/admin/approve-user/${id}`, {}, { withCredentials: true });
    fetchPending();
  };

  // Delete a user
  const deleteUser = async (id) => {
    await axios.delete(`http://localhost:5000/admin/delete-user/${id}`, {
      withCredentials: true,
    });
    fetchPending();
  };

  // Fetch group (if exists)
  const fetchGroup = async () => {
    try {
      const res = await axios.get("http://localhost:5000/group/my-group", {
        withCredentials: true,
      });
      setGroup(res.data);
    } catch (err) {
      console.log("No group created yet");
    }
  };

  // Create group
  const createGroup = async () => {
    if (!groupName.trim() || !groupDescription.trim()) {
      alert("Group name and description required.");
      return;
    }
    try {
      await axios.post(
        "http://localhost:5000/group/create",
        { name: groupName, description: groupDescription },
        { withCredentials: true }
      );
      setGroupName('');
      setGroupDescription('');
      fetchGroup();
    } catch (err) {
      console.error("Error creating group:", err);
    }
  };

  // Fetch posts
  const fetchPosts = async () => {
    try {
      const res = await axios.get("http://localhost:5000/group/posts", {
        withCredentials: true,
      });
      setPosts(res.data);
    } catch (err) {
      console.error("Error fetching posts:", err);
    }
  };

  // Create post
  const createPost = async () => {
    if (!postText.trim()) {
      alert("Post content is required.");
      return;
    }

    const formData = new FormData();
    formData.append("content", postText);
    if (postFile) formData.append("media", postFile);

    try {
      await axios.post("http://localhost:5000/group/post", formData, {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      });
      setPostText('');
      setPostFile(null);
      fetchPosts();
    } catch (err) {
      console.error("Error creating post:", err);
    }
  };

  // Delete post
  const deletePost = async (postId) => {
    try {
      await axios.delete(`http://localhost:5000/group/delete-post/${postId}`, {
        withCredentials: true,
      });
      fetchPosts();
    } catch (err) {
      console.error("Error deleting post:", err);
    }
  };

  useEffect(() => {
    fetchPending();
    fetchGroup();
    fetchPosts();
  }, []);

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Admin Dashboard</h2>

      {/* PENDING USERS */}
      <h3 className="text-xl font-semibold mb-2">Pending Users</h3>
      <ul className="space-y-4 mb-8">
        {pendingUsers.length === 0 && <p className="text-gray-500">No pending requests.</p>}
        {pendingUsers.map((user) => (
          <li
            key={user._id}
            className="border p-4 flex justify-between items-center"
          >
            <div>
              <p><strong>Username:</strong> {user.username}</p>
              <p><strong>Email:</strong> {user.email}</p>
              <p><strong>College:</strong> {user.college}</p>
            </div>
            <div className="flex gap-2">
              <button className="bg-blue-500 text-white px-3 py-1 rounded" onClick={() => approveUser(user._id)}>Approve</button>
              <button className="bg-red-500 text-white px-3 py-1 rounded" onClick={() => deleteUser(user._id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>

      <hr className="my-6" />

      {/* GROUP CREATION */}
      <h3 className="text-xl font-semibold mb-2">Your Group</h3>
      {!group ? (
        <div className="border p-4 rounded mb-6">
          <input
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
            placeholder="Group name"
            className="border p-2 w-full mb-2"
          />
          <textarea
            value={groupDescription}
            onChange={(e) => setGroupDescription(e.target.value)}
            placeholder="Group description"
            className="border p-2 w-full mb-2"
          />
          <button className="bg-green-600 text-white px-4 py-2 rounded" onClick={createGroup}>Create Group</button>
        </div>
      ) : (
        <div className="border p-4 rounded mb-6">
          <p><strong>Name:</strong> {group.name}</p>
          <p><strong>Description:</strong> {group.description}</p>
        </div>
      )}

      <hr className="my-6" />

      {/* POST CREATION */}
      <h3 className="text-xl font-semibold mb-2">Create a Post</h3>
      <div className="border p-4 rounded mb-6">
        <textarea
          value={postText}
          onChange={(e) => setPostText(e.target.value)}
          placeholder="Write your post..."
          className="w-full p-2 border mb-2"
        />
        <input
          type="file"
          accept="image/*,video/*"
          onChange={(e) => setPostFile(e.target.files[0])}
          className="mb-2"
        />
        <button className="bg-green-600 text-white px-4 py-2 rounded" onClick={createPost}>Create Post</button>
      </div>

      {/* POSTS */}
      <h3 className="text-xl font-semibold mb-2">Your Posts</h3>
      <ul className="space-y-4">
        {posts.length === 0 && <p className="text-gray-500">No posts yet.</p>}
        {posts.map((post) => (
          <li key={post._id} className="border p-4 rounded">
            <p className="mb-2">{post.content}</p>

            {/* Media Preview */}
            {post.mediaUrl && post.mediaType === 'image' && (
              <img
                src={`http://localhost:5000${post.mediaUrl}`}
                alt="Post"
                className="max-w-full rounded my-2"
              />
            )}
            {post.mediaUrl && post.mediaType === 'video' && (
              <video controls className="w-full rounded my-2">
                <source src={`http://localhost:5000${post.mediaUrl}`} />
                Your browser does not support the video tag.
              </video>
            )}

            <button
              className="bg-red-500 text-white px-3 py-1 rounded mt-2"
              onClick={() => deletePost(post._id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminDashboard;
