import { useState, useEffect } from "react";
import {
  FaHeart,
  FaRegHeart,
  FaCommentAlt,
  FaTrash,
  FaPaperPlane,
} from "react-icons/fa";
import axios from "../utils/axiosInstance";
import toast from "react-hot-toast";
import { useProfile } from "@/hooks/authService";

const getImageUrl = (path) => {
  if (!path) return "https://via.placeholder.com/100";
  if (path.startsWith("http")) return path;
  return `https://localhost:7286/${path}`;
};

// Helper function to validate image URLs
// const isValidImage = (url) => {
//  if (!url || typeof url !== "string") return false;
// const trimmed = url.trim().toLowerCase();
//  if (trimmed === "" || trimmed === "null" || trimmed === "undefined")
//   return false;
// Optional: exclude known bad patterns
// if (trimmed.includes(".svg") && trimmed.includes("placeholder")) return true; // allow placeholder SVGs
// if (
//   trimmed.endsWith("/") ||
//   trimmed.endsWith(".undefined") ||
////    trimmed.includes("/null")
// )
//   return false;
// return true;
//};
export default function PostCard({ post, onPostDeleted }) {
  const [comments, setComments] = useState([]);
  const [showComments, setShowComments] = useState(false);
  const [reacted, setReacted] = useState(false);
  const [likes, setLikes] = useState(post.reactCount || 0);
  const [newComment, setNewComment] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  const { data: currentUser } = useProfile();
  const isOwner = currentUser?.userName === post.userName;

  const fetchReactState = async () => {
    try {
      const res = await axios.get(`/api/React/${post.id}`, {
        withCredentials: true,
      });
      const users = res.data?.value || [];
      setLikes(users.length);
      setReacted(users.some((u) => u.userName === currentUser?.userName));
    } catch (err) {
      console.error("React state load error", err);
    }
  };

  const toggleLike = async () => {
    try {
      setReacted(true);
      await axios.post(
        `/api/React`,
        { postId: post.id, type: 1 },
        { withCredentials: true }
      );
      fetchReactState();
    } catch (err) {
      toast.error("Failed to like post");
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
    if (!confirm("Are you sure you want to delete this post?")) return;
    try {
      setIsDeleting(true);
      await axios.delete(`/api/posts/${post.id}`, { withCredentials: true });
      toast.success("Post deleted");
      setTimeout(() => onPostDeleted?.(), 300);
    } catch (err) {
      setIsDeleting(false);
      toast.error("You’re not authorized to delete this post.");
    }
  };

  useEffect(() => {
    fetchReactState();
  }, []);

  useEffect(() => {
    if (showComments) fetchComments();
  }, [showComments]);

  return (
    <div className="flex justify-center">
      <div
        className={`w-full max-w-2xl bg-white dark:bg-gray-900 shadow rounded-xl p-4 border border-gray-200 dark:border-gray-700 space-y-4 transition-opacity duration-300 ${
          isDeleting ? "opacity-0" : "opacity-100"
        }`}
      >
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <img
              src={getImageUrl(post.imagePathUser)}
              alt="Avatar"
              className="w-10 h-10 rounded-full object-cover"
            />
            <div>
              <p className="font-semibold text-sm">{post.userName}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {post.time}
              </p>
            </div>
          </div>

          {isOwner && (
            <button
              onClick={deletePost}
              className="text-red-500 hover:text-red-700"
              title="Delete Post"
            >
              <FaTrash />
            </button>
          )}
        </div>

        <p className="text-gray-800 dark:text-gray-100 text-sm">
          {post.content}
        </p>

        {post.imagePath && (
          <img
            src={getImageUrl(post.imagePath)}
            alt="Post"
            className="w-full max-h-[500px] rounded-md object-contain border"
          />
        )}

        <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 pt-2">
          <button
            onClick={toggleLike}
            className={`flex items-center gap-1 hover:text-red-500 transition transform duration-200 ${
              reacted ? "text-red-500 scale-110" : ""
            }`}
          >
            {reacted ? <FaHeart /> : <FaRegHeart />}
            <span>{likes} Likes</span>
          </button>
          <button
            onClick={() => setShowComments(!showComments)}
            className="flex items-center gap-1 hover:text-blue-600"
          >
            <FaCommentAlt />
            <span>{comments.length || post.countComment} Comments</span>
          </button>
        </div>

        {showComments && (
          <div className="pt-2 border-t dark:border-gray-700 space-y-2">
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Write a comment..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                className="flex-1 px-3 py-2 border rounded-md text-sm dark:bg-gray-800 dark:text-white dark:border-gray-700"
              />
              <button
                onClick={addComment}
                className="text-blue-600 hover:text-blue-800"
              >
                <FaPaperPlane />
              </button>
            </div>

            {comments.map((c) => (
              <div key={c.id} className="flex gap-2 items-start">
                <img
                  src={getImageUrl(c.imagePathUser)}
                  alt="User"
                  className="w-8 h-8 rounded-full object-cover"
                />
                <div className="bg-gray-100 dark:bg-gray-800 p-2 rounded-md w-full">
                  <p className="text-sm text-gray-800 dark:text-white">
                    <span className="font-semibold">{c.userName}</span>:{" "}
                    {c.content}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
