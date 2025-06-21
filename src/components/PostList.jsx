import { useEffect, useState } from "react";
import axios from "../utils/axiosInstance";
import PostCard from "./PostCard";

export default function PostList() {
  const [posts, setPosts] = useState([]);

  const fetchPosts = async () => {
    try {
      const res = await axios.get("https://greenland.runasp.net/api/posts");
      setPosts(res.data.value || []);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className="space-y-6">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} onPostDeleted={fetchPosts} />
      ))}
    </div>
  );
}
