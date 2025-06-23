import { useEffect, useState } from "react";
import axios from "../utils/axiosInstance";
import PostCard from "../components/PostCard";
import CreatePost from "../components/CreatePost";
import Sidebar from "../components/Sidebar";

export default function Community() {
  const [posts, setPosts] = useState([]);

  const fetchAllPosts = async () => {
    try {
      const res = await axios.get("https://localhost:7286/api/posts", {
        withCredentials: true,
      });
      setPosts(res.data.value || []);
    } catch (err) {
      console.error("Error fetching posts", err);
    }
  };

  useEffect(() => {
    fetchAllPosts();
  }, []);

  return (
    <div className="flex">
      <Sidebar />
      <div className="ml-64 w-full p-4 bg-green-50 dark:bg-gray-800 min-h-screen space-y-6">
        <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
          Community Feed
        </h2>

        {/* Create Post */}
        <CreatePost onPostCreated={fetchAllPosts} />

        {/* Posts Section */}
        <div className="space-y-4">
          {posts.length === 0 ? (
            <div className="text-center text-gray-600 dark:text-gray-300 text-sm py-10">
              No posts available yet.
            </div>
          ) : (
            posts.map((post) => (
              <PostCard
                key={post.id}
                post={post}
                onPostDeleted={fetchAllPosts}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
