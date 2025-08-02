import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../api";

const Profile = () => {
  const { id } = useParams();
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    API.get(`/users/${id}`)
      .then((res) => setProfile(res.data))
      .catch((err) => console.error(err));
  }, [id]);

  if (!profile) return <p>Loading...</p>;
  return (
    <div className="p-6 max-w-2xl mx-auto bg-white rounded-xl shadow-md space-y-4 mt-10 font-semibold ">
      <h2 className="text-3xl font-bold text-center text-green-950 ">
        {profile.name || "Unnamed User"}'s Profile
      </h2>
      <p>
        <strong>Email:</strong> {profile.email || "No email available"}
      </p>
      <p>
        <strong>Bio:</strong> {profile.bio || "No bio provided."}
      </p>

      <h3 className="text-xl font-semibold mt-4">Posts</h3>
      {Array.isArray(profile.posts) && profile.posts.length > 0 ? (
        profile.posts.map((post) => (
          <div key={post._id} className="border p-3 rounded-md shadow-sm my-2">
            <p className="font-semibold">{post.text}</p>
            <small className="text-gray-500">
              {new Date(post.createdAt).toLocaleString()}
            </small>
          </div>
        ))
      ) : (
        <p className="text-gray-600">No posts available.</p>
      )}
    </div>
  );
};

export default Profile;
