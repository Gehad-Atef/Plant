import { useEffect, useState } from "react";
import axios from "../utils/axiosInstance";
import PostCard from "../components/PostCard";
import CreatePost from "../components/CreatePost";
import Sidebar from "../components/Sidebar";
import { useNavigate } from "react-router-dom";

const getImageUrl = (path) => {
  if (!path) return "https://via.placeholder.com/100";
  if (path.startsWith("http")) return path;
  return `https://localhost:7286/${path}`;
};

export default function MyPosts() {
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const fetchMyPosts = async () => {
    try {
      const res = await axios.get("https://localhost:7286/me/Posts", {
        withCredentials: true,
      });
      setPosts(res.data || []);
    } catch (err) {
      console.error("Error fetching posts", err);
    }
  };

  const fetchProfile = async () => {
    try {
      const res = await axios.get("https://localhost:7286/me", {
        withCredentials: true,
      });
      setUser(res.data || null);
    } catch (err) {
      console.error("Failed to load profile info", err);
    }
  };

  useEffect(() => {
    fetchMyPosts();
    fetchProfile();
  }, []);

  const getFullName = (user) => {
    const hasName = user?.firstName || user?.lastName;
    return hasName
      ? `${user.firstName || ""} ${user.lastName || ""}`.trim()
      : user.userName;
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="ml-64 w-full p-4 bg-green-50 dark:bg-gray-800 min-h-screen space-y-6">
        {/* Profile Header */}
        {user && (
          <div className="bg-white dark:bg-gray-900 shadow rounded-xl p-5 border border-gray-300 dark:border-gray-700 flex flex-col sm:flex-row items-center sm:justify-between gap-4">
            <div className="flex items-center gap-4">
              <img
                src={getImageUrl(user.imagePath)}
                alt="User Avatar"
                className="w-16 h-16 rounded-full object-cover border"
              />
              <div>
                <p className="text-lg font-semibold text-gray-900 dark:text-white">
                  {getFullName(user)}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {user.email || "No email available"}
                </p>
              </div>
            </div>

            <button
              onClick={() => navigate("/profile")}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded shadow text-sm"
            >
              Edit Profile
            </button>
          </div>
        )}

        {/* Create Post */}
        <CreatePost onPostCreated={fetchMyPosts} />

        {/* Posts Section */}
        <div className="space-y-4">
          {posts.length === 0 ? (
            <div className="text-center text-gray-600 dark:text-gray-300 text-sm py-10">
              You haven’t posted anything yet.
            </div>
          ) : (
            posts.map((post) => (
              <PostCard
                key={post.id}
                post={post}
                onPostDeleted={fetchMyPosts}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
