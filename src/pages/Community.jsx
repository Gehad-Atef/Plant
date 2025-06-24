// src/pages/Community.jsx
import { useEffect, useState, useRef, useCallback } from "react";
import axios from "../utils/axiosInstance";
import PostCard from "../components/PostCard";
import CreatePost from "../components/CreatePost";
import Sidebar from "../components/Sidebar";
import toast from "react-hot-toast";
import PostSkeleton from "../components/PostSkeleton";

const POSTS_PER_PAGE = 5;

export default function Community() {
  const [allPosts, setAllPosts] = useState([]);
  const [visiblePosts, setVisiblePosts] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const loaderRef = useRef(null);

  const fetchAllPosts = async () => {
    try {
      const res = await axios.get("https://localhost:7286/api/posts");
      const data = res.data?.value || [];
      setAllPosts(data);
      setVisiblePosts(data.slice(0, POSTS_PER_PAGE));
      setHasMore(data.length > POSTS_PER_PAGE);
      setPage(1);
    } catch (err) {
      toast.error("Failed to load posts");
    } finally {
      setLoading(false);
    }
  };

  const loadMore = useCallback(() => {
    if (loadingMore || !hasMore) return;
    setLoadingMore(true);
    setTimeout(() => {
      const nextPage = page + 1;
      const newSlice = allPosts.slice(0, nextPage * POSTS_PER_PAGE);
      setVisiblePosts(newSlice);
      setPage(nextPage);
      setHasMore(allPosts.length > newSlice.length);
      setLoadingMore(false);
    }, 400); // simulate network delay
  }, [page, allPosts, loadingMore, hasMore]);

  const onScroll = useCallback(() => {
    if (
      loaderRef.current &&
      loaderRef.current.getBoundingClientRect().top < window.innerHeight
    ) {
      loadMore();
    }
  }, [loadMore]);

  useEffect(() => {
    fetchAllPosts();
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [onScroll]);

  // ✅ Refetch on new post instead of manually injecting
  const handleNewPost = async () => {
    await fetchAllPosts();
    toast.success("Post shared!");
  };

  return (
    <div className="flex flex-col md:flex-row">
      <Sidebar />
      <main className="flex-1 px-4 py-6 bg-green-50 dark:bg-gray-800 min-h-screen md:ml-64 space-y-6">
        <h2 className="text-xl font-bold text-gray-800 dark:text-white">
          Community Feed
        </h2>

        <CreatePost onPostCreated={handleNewPost} />

        {/* Skeleton Loading */}
        {loading ? (
          <div className="space-y-4">
            {Array.from({ length: 3 }).map((_, idx) => (
              <PostSkeleton key={idx} />
            ))}
          </div>
        ) : visiblePosts.length === 0 ? (
          <p className="text-center text-gray-500 dark:text-gray-300 py-10">
            No posts yet.
          </p>
        ) : (
          visiblePosts.map((post) =>
            post?.id ? (
              <PostCard
                key={post.id}
                post={post}
                onPostDeleted={fetchAllPosts}
              />
            ) : null
          )
        )}

        {hasMore && (
          <div ref={loaderRef} className="text-center py-4">
            {loadingMore && <PostSkeleton />}
          </div>
        )}
      </main>
    </div>
  );
}
