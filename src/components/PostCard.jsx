import { useState, useEffect } from "react";
import {
  FaHeart,
  FaRegHeart,
  FaCommentAlt,
  FaTrash,
  FaPaperPlane,
} from "react-icons/fa";
import axios from "../utils/axiosInstance";

// ✅ دالة موحدة للتعامل مع روابط الصور
const getImageUrl = (path) => {
  if (!path) return "https://via.placeholder.com/100";
  if (path.startsWith("http")) return path;
  return `https://localhost:7286/${path}`;
};

export default function PostCard({ post, onPostDeleted }) {
  const [comments, setComments] = useState([]);
  const [showComments, setShowComments] = useState(false);
  const [reacted, setReacted] = useState(false);
  const [likes, setLikes] = useState(post.reactCount || 0);
  const [newComment, setNewComment] = useState("");

  const fetchReactState = async () => {
    try {
      const res = await axios.get(`/api/React/${post.id}`, {
        withCredentials: true,
      });
      const users = res.data?.value || [];
      setReacted(users.some((u) => u.userName === post.userName));
    } catch (err) {
      console.error("React state load error", err);
    }
  };

  const toggleLike = async () => {
    try {
      await axios.post(
        `/api/React`,
        { postId: post.id, type: 1 },
        { withCredentials: true }
      );
      const res = await axios.get(`/api/React/${post.id}`, {
        withCredentials: true,
      });
      const users = res.data?.value || [];
      setLikes(users.length);
      setReacted(users.some((u) => u.userName === post.userName));
    } catch (err) {
      console.error("React toggle failed", err);
    }
  };

  const fetchComments = async () => {
    try {
      const res = await axios.get(`/api/Comment/${post.id}`, {
        withCredentials: true,
      });
      setComments(res.data?.value || []);
    } catch (err) {
      console.error("Error loading comments", err);
    }
  };

  const addComment = async () => {
    if (!newComment.trim()) return;
    try {
      await axios.post(
        `/api/Comment`,
        { postId: post.id, content: newComment },
        { withCredentials: true }
      );
      setNewComment("");
      fetchComments();
    } catch (err) {
      console.error("Add comment failed", err);
    }
  };

  const deletePost = async () => {
    try {
      await axios.delete(`/api/posts/${post.id}`, {
        withCredentials: true,
      });
      onPostDeleted?.();
    } catch (err) {
      console.error("Delete failed", err);
    }
  };

  useEffect(() => {
    fetchReactState();
  }, []);

  useEffect(() => {
    if (showComments) fetchComments();
  }, [showComments]);

  return (
    <div className="bg-white dark:bg-gray-900 dark:text-white shadow rounded-xl p-4 space-y-2 border border-gray-200 dark:border-gray-700">
      {/* Post header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <img
            src={getImageUrl(post.imagePathUser)}
            alt="User avatar"
            className="w-10 h-10 rounded-full object-cover"
          />
          <span className="font-semibold">{post.userName}</span>
        </div>
        <button
          onClick={deletePost}
          className="text-red-500 hover:text-red-700"
        >
          <FaTrash />
        </button>
      </div>

      {/* Content */}
      <p className="text-gray-800 dark:text-gray-100">{post.content}</p>
      {post.imagePath && post.imagePath !== "https://localhost:7286/" && (
        <img
          src={getImageUrl(post.imagePath)}
          alt="Post"
          className="w-full max-h-96 rounded-md object-cover"
        />
      )}

      {/* Reactions */}
      <div className="flex items-center justify-between pt-2 text-gray-600 dark:text-gray-400 text-sm">
        <button
          onClick={toggleLike}
          className="flex items-center space-x-1 hover:text-red-500 dark:hover:text-red-400"
        >
          {reacted ? <FaHeart className="text-red-500" /> : <FaRegHeart />}
          <span>{likes} Likes</span>
        </button>
        <button
          onClick={() => setShowComments(!showComments)}
          className="flex items-center space-x-1 hover:text-blue-600 dark:hover:text-blue-400"
        >
          <FaCommentAlt />
          <span>{comments.length || post.commentCount || 0} Comments</span>
        </button>
      </div>

      {/* Comments section */}
      {showComments && (
        <div className="pt-2 space-y-2 border-t border-gray-200 dark:border-gray-700">
          <div className="flex space-x-2">
            <input
              type="text"
              placeholder="Write a comment..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="flex-1 px-3 py-2 border rounded-md text-sm dark:bg-gray-800 dark:text-white dark:border-gray-700"
            />
            <button
              onClick={addComment}
              className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
            >
              <FaPaperPlane />
            </button>
          </div>
          {comments.map((c) => (
            <div key={c.id} className="flex items-start space-x-2">
              <img
                src={getImageUrl(c.imagePathUser)}
                alt="User"
                className="w-8 h-8 rounded-full object-cover"
              />
              <div className="flex-1 bg-gray-100 dark:bg-gray-800 p-2 rounded-md">
                <p className="text-sm dark:text-white">
                  <span className="font-semibold">{c.userName}</span>:{" "}
                  {c.content}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
