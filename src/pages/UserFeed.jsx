import { useState, useEffect } from 'react';
import axios from 'axios';

const UserFeed = () => {
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState({});

  const fetchPosts = async () => {
    try {
      const res = await axios.get('http://localhost:5000/group/posts', {
        withCredentials: true,
      });
      setPosts(res.data);
    } catch (err) {
      console.error('Error fetching posts:', err);
    }
  };

  const likePost = async (id) => {
    try {
      await axios.put(`http://localhost:5000/group/like/${id}`, {}, {
        withCredentials: true,
      });
      fetchPosts();
    } catch (err) {
      console.error('Error liking post:', err);
    }
  };

  const commentPost = async (id) => {
    const text = comments[id];
    if (!text) return;
    try {
      await axios.post(
        `http://localhost:5000/group/comment/${id}`,
        { text },
        { withCredentials: true }
      );
      setComments({ ...comments, [id]: '' });
      fetchPosts();
    } catch (err) {
      console.error('Error posting comment:', err);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Group Posts</h2>
      {posts.map((post) => (
        <div key={post._id} className="border p-4 mb-6 rounded shadow-sm">
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

          <p className="text-sm text-gray-600 mb-2">Likes: {post.likes}</p>

          <div className="flex items-center gap-2 mb-2">
            <button
              onClick={() => likePost(post._id)}
              className="text-blue-600 font-semibold"
            >
              👍 Like
            </button>
            <input
              value={comments[post._id] || ''}
              onChange={(e) =>
                setComments({ ...comments, [post._id]: e.target.value })
              }
              placeholder="Add comment"
              className="border px-2 py-1 rounded w-full max-w-xs"
            />
            <button
              onClick={() => commentPost(post._id)}
              className="text-green-600 font-semibold"
            >
              💬 Comment
            </button>
          </div>

          {/* Comments */}
          <ul className="text-sm text-gray-700 mt-2 pl-2 list-disc">
            {post.comments.map((c, i) => (
              <li key={i}>– {c.text}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default UserFeed;
