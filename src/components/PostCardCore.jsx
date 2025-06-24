// src/components/PostCardCore.jsx
import {
  FaHeart,
  FaRegHeart,
  FaCommentAlt,
  FaTrash,
  FaPaperPlane,
} from "react-icons/fa";
import { useState, useEffect } from "react";
import axios from "../utils/axiosInstance";
import toast from "react-hot-toast";
import { useProfile } from "@/hooks/authService";

const getImageUrl = (path) => {
  if (
    !path ||
    typeof path !== "string" ||
    path.trim() === "" ||
    path.includes("undefined") ||
    path.includes("null")
  ) {
    return "https://via.placeholder.com/100";
  }
  return path.startsWith("http") ? path : `https://localhost:7286/${path}`;
};

const isValidImage = (url) => {
  if (!url || typeof url !== "string") return false;
  const trimmed = url.trim().toLowerCase();
  return !(
    trimmed === "" ||
    trimmed === "null" ||
    trimmed === "undefined" ||
    trimmed === "https://localhost:7286" ||
    trimmed === "http://localhost:7286" ||
    trimmed === "https://localhost:7286/" ||
    trimmed === "http://localhost:7286/" ||
    trimmed.endsWith("/") ||
    trimmed.endsWith(".undefined") ||
    trimmed.includes("/null")
  );
};

export default function PostCardCore({
  post,
  isModal = false,
  onPostDeleted,
  onUpdateCommentCount,
}) {
  const [comments, setComments] = useState([]);
  const [showComments, setShowComments] = useState(false);
  const [reacted, setReacted] = useState(false);
  const [likes, setLikes] = useState(post.reactCount || 0);
  const [newComment, setNewComment] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [showLikesList, setShowLikesList] = useState(false);
  const [likedUsers, setLikedUsers] = useState([]);

  const { data: currentUser } = useProfile();
  const isOwner = currentUser?.userName === post.userName;
  const isAdmin = currentUser?.role === "Admin";

  const fetchReactState = async () => {
    try {
      const res = await axios.get(`/api/React/${post.id}`);
      const users = res.data?.value || [];
      setLikes(users.length);
      setReacted(users.some((u) => u.userName === currentUser?.userName));
      setLikedUsers(users);
    } catch {
      toast.error("Could not load reactions");
    }
  };

  const toggleLike = async () => {
    try {
      await axios.post(`/api/React`, { postId: post.id, type: 1 });
      fetchReactState();
    } catch {
      toast.error("Failed to like post");
    }
  };

  const fetchComments = async () => {
    try {
      const res = await axios.get(`/api/Comment/${post.id}`);
      const commentList = res.data?.value || [];
      setComments(commentList);
      if (onUpdateCommentCount)
        onUpdateCommentCount(post.id, commentList.length);
    } catch {
      toast.error("Failed to load comments");
    }
  };

  const addComment = async () => {
    if (!newComment.trim()) return;
    try {
      await axios.post(`/api/Comment`, {
        postId: post.id,
        content: newComment,
      });
      setNewComment("");
      fetchComments();
    } catch {
      toast.error("Failed to add comment");
    }
  };

  const deletePost = async () => {
    if (!confirm("Are you sure you want to delete this post?")) return;
    try {
      setIsDeleting(true);
      await axios.delete(`/api/posts/${post.id}`);
      toast.success("Post deleted");
      setTimeout(() => onPostDeleted?.(), 300);
    } catch {
      setIsDeleting(false);
      toast.error("Not authorized to delete post");
    }
  };

  const deleteComment = async (commentId) => {
    if (!confirm("Delete this comment?")) return;
    try {
      await axios.delete(`/api/Comment/${commentId}`);
      toast.success("Comment deleted");
      fetchComments();
    } catch {
      toast.error("Not authorized");
    }
  };

  useEffect(() => {
    fetchReactState();
  }, []);

  useEffect(() => {
    if (showComments) fetchComments();
  }, [showComments]);

  return (
    <>
      <div
        className={`${
          isModal ? "" : "flex justify-center"
        } transition-opacity duration-300 ${
          isDeleting ? "opacity-0" : "opacity-100"
        }`}
      >
        <div className="w-full max-w-2xl bg-white dark:bg-gray-900 shadow rounded-xl p-4 border border-gray-200 dark:border-gray-700 space-y-4">
          {/* Header */}
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <img
                src={getImageUrl(post.imagePathUser)}
                onError={(e) =>
                  (e.target.src = "https://via.placeholder.com/100")
                }
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
            {(isOwner || isAdmin) && (
              <button
                onClick={deletePost}
                className="text-red-500 hover:text-red-700"
                title="Delete Post"
              >
                <FaTrash />
              </button>
            )}
          </div>

          {/* Content */}
          <p className="text-gray-800 dark:text-gray-100 text-sm">
            {post.content}
          </p>

          {isValidImage(post.imagePath) && (
            <img
              src={getImageUrl(post.imagePath)}
              onError={(e) =>
                (e.target.src = "https://via.placeholder.com/300x200")
              }
              alt="Post"
              className="w-full max-h-[500px] rounded-md object-contain border"
            />
          )}

          {/* Reactions */}
          <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 pt-2">
            <div className="flex items-center gap-1">
              <button
                onClick={toggleLike}
                className={`hover:text-red-500 transition transform duration-200 ${
                  reacted ? "text-red-500 scale-110" : ""
                }`}
              >
                {reacted ? <FaHeart /> : <FaRegHeart />}
              </button>
              <button
                onClick={() => setShowLikesList(true)}
                className="text-sm text-gray-700 dark:text-gray-300 hover:underline"
              >
                {likes} Likes
              </button>
            </div>
            <button
              onClick={() => setShowComments(!showComments)}
              className="flex items-center gap-1 hover:text-blue-600"
            >
              <FaCommentAlt />
              <span>{comments.length || post.countComment} Comments</span>
            </button>
          </div>

          {/* Comments */}
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

              {comments.map((c) => {
                const canDeleteComment =
                  c.userName === currentUser?.userName ||
                  post.userName === currentUser?.userName ||
                  isAdmin;

                return (
                  <div
                    key={c.id}
                    className="flex justify-between items-start gap-2"
                  >
                    <div className="flex gap-2">
                      <img
                        src={getImageUrl(c.imagePathUser)}
                        onError={(e) =>
                          (e.target.src = "https://via.placeholder.com/80")
                        }
                        alt="User"
                        className="w-8 h-8 rounded-full object-cover"
                      />
                      <div className="bg-gray-100 dark:bg-gray-800 p-2 rounded-md">
                        <p className="text-sm text-gray-800 dark:text-white">
                          <span className="font-semibold">{c.userName}</span>:{" "}
                          {c.content}
                        </p>
                      </div>
                    </div>
                    {canDeleteComment && (
                      <button
                        onClick={() => deleteComment(c.id)}
                        className="text-red-500 hover:text-red-700 text-sm"
                        title="Delete Comment"
                      >
                        <FaTrash />
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Likes Modal */}
      {showLikesList && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
          <div className="bg-white dark:bg-gray-900 p-5 rounded-md shadow-lg w-80 max-h-[70vh] overflow-y-auto space-y-3">
            <h3 className="text-lg font-semibold text-center text-gray-900 dark:text-white">
              Liked by
            </h3>
            {likedUsers.length === 0 ? (
              <p className="text-sm text-center text-gray-500 dark:text-gray-400">
                No likes yet.
              </p>
            ) : (
              <ul className="space-y-2">
                {likedUsers.map((user) => (
                  <li key={user.id} className="flex items-center gap-3">
                    <img
                      src={getImageUrl(user.imageUrl)}
                      onError={(e) =>
                        (e.target.src = "https://via.placeholder.com/80")
                      }
                      alt={user.userName}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <span className="text-sm text-gray-800 dark:text-white">
                      {user.userName}
                    </span>
                  </li>
                ))}
              </ul>
            )}
            <div className="text-right">
              <button
                onClick={() => setShowLikesList(false)}
                className="mt-3 px-4 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
