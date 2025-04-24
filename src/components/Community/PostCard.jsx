import { Link } from "react-router-dom";

const PostCard = ({ post }) => {
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
      {/* User Info */}
      <div className="flex items-center mb-4">
        <img
          src={post.imagePathUser}
          alt={post.userName}
          className="w-12 h-12 rounded-full mr-4 object-cover border-2 border-green-600"
        />
        <div>
          <h3 className="font-bold text-lg text-gray-800 dark:text-white">
            {post.userName}
          </h3>
          <p className="text-sm text-gray-500">Posted recently</p>
        </div>
      </div>

      {/* Post Content */}
      <p className="mb-4 text-gray-700 dark:text-gray-300">{post.content}</p>

      {/* Post Image */}
      {post.imageUrl && (
        <img
          src={post.imageUrl}
          alt="Post"
          className="w-full h-64 object-cover rounded-lg mb-4"
          onError={(e) => {
            e.target.src = "https://via.placeholder.com/400"; // Fallback image
          }}
        />
      )}

      {/* View Comments Button */}
      <Link
        to={`/community/post/${post.id}`}
        className="text-green-600 hover:underline font-medium"
      >
        View Comments
      </Link>
    </div>
  );
};

export default PostCard;
