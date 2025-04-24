import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PostCard from "../components/Community/PostCard";
import { getPosts } from "../api/api";

const Community = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [pagination, setPagination] = useState({
    pageNumber: 1,
    totalPages: 1,
  });

  const fetchPosts = async (page = 1) => {
    try {
      setLoading(true);
      const data = await getPosts(page); // Fetch posts with pagination
      setPosts(data.value || []);
      setPagination({
        pageNumber: data.value.pageNumber,
        totalPages: data.value.totalPages,
      });
      setLoading(false);
    } catch (err) {
      console.error("Error fetching posts:", err);
      setError("You must be logged in to view posts.");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts(); // Initial fetch
  }, []);

  return (
    <div className="container mx-auto px-4 py-10 bg-gray-50 dark:bg-gray-900 min-h-screen">
      {/* Header Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-green-800 dark:text-white mb-4">
          Community Discussions
        </h1>
        <p className="text-lg text-gray-700 dark:text-gray-300">
          Share your gardening tips, ask questions, and connect with fellow
          plant enthusiasts!
        </p>
      </div>

      {/* Add New Post Button */}
      <div className="flex justify-end mb-8">
        <Link
          to="/community/new"
          className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition duration-300"
        >
          Create New Post
        </Link>
      </div>

      {/* Post List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {loading ? (
          Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="w-full h-48 bg-gray-200 animate-pulse rounded-lg"
            ></div>
          ))
        ) : error ? (
          <div className="col-span-full text-center text-red-500">{error}</div>
        ) : posts.length === 0 ? (
          <div className="col-span-full text-center text-gray-500">
            No posts available at the moment.
          </div>
        ) : (
          posts.map((post) => <PostCard key={post.id} post={post} />)
        )}
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-8">
        <button
          onClick={() => fetchPosts(pagination.pageNumber - 1)}
          disabled={pagination.pageNumber === 1}
          className="px-4 py-2 bg-green-600 text-white rounded-l-lg disabled:bg-gray-400"
        >
          Previous
        </button>
        <span className="px-4 py-2 bg-gray-200 text-gray-700">
          Page {pagination.pageNumber} of {pagination.totalPages}
        </span>
        <button
          onClick={() => fetchPosts(pagination.pageNumber + 1)}
          disabled={pagination.pageNumber === pagination.totalPages}
          className="px-4 py-2 bg-green-600 text-white rounded-r-lg disabled:bg-gray-400"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Community;
