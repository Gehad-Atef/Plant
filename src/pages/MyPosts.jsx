import  { useEffect, useState } from "react";
import axios from "../utils/axiosInstance";
import PostCard from "../components/PostCard";
import Sidebar from "../components/Sidebar";

export default function MyPosts() {
  const [posts, setPosts] = useState([]);

  const fetchMyPosts = async () => {
    try {
      const res = await axios.get("https://localhost:7286/me/Posts", {
        withCredentials: true,
      });
      setPosts(res.data || []);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchMyPosts();
  }, []);

  return (
    <div className="flex">
      <Sidebar />
      <div className="ml-64 w-full p-4 bg-green-50 dark:bg-gray-800 min-h-screen space-y-6">
        <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
          My Posts
        </h2>
        <div className="space-y-4">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      </div>
    </div>
  );
}
