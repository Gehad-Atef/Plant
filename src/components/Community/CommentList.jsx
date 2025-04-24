import  { useEffect, useState } from "react";
import { getCommentsByPost, addComment, deleteComment } from "../../api/api";

const CommentList = ({ postId }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const data = await getCommentsByPost(postId); // Fetch comments using the API function
        setComments(data.value || []);
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };
    fetchComments();
  }, [postId]);

  const handleAddComment = async () => {
    try {
      const commentData = { postId, content: newComment };
      const result = await addComment(commentData); // Add a new comment
      setComments([...comments, result.value]);
      setNewComment("");
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      await deleteComment(commentId); // Delete a comment
      setComments(comments.filter((comment) => comment.id !== commentId));
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  };

  return (
    <div className="space-y-4 mt-6">
      <h2 className="text-xl font-bold text-green-800 dark:text-white mb-4">
        Comments
      </h2>
      {comments.map((comment) => (
        <div
          key={comment.id}
          className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg flex justify-between items-center"
        >
          <p className="text-gray-700 dark:text-gray-300">{comment.content}</p>
          <button
            onClick={() => handleDeleteComment(comment.id)}
            className="text-red-500 hover:underline"
          >
            Delete
          </button>
        </div>
      ))}
      <div className="mt-4 space-y-2">
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Add a comment..."
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
        />
        <button
          onClick={handleAddComment}
          className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition duration-300"
        >
          Comment
        </button>
      </div>
    </div>
  );
};

export default CommentList;
