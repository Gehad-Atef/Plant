import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createPost } from "../../api/api";

const AddPost = () => {
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!["image/jpeg", "image/png", "image/gif"].includes(file.type)) {
        setErrorMessage("Please upload a valid image (JPEG, PNG, GIF).");
        return;
      }
      if (file.size > 2 * 1024 * 1024) {
        setErrorMessage("File size must not exceed 2MB.");
        return;
      }
      setImage(file);
      setErrorMessage("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (errorMessage) return;

    const formData = new FormData();
    formData.append("content", content);
    if (image) formData.append("image", image);

    try {
      await createPost(formData);
      alert("Post created successfully!");
      navigate("/community");
    } catch (error) {
      console.error("Failed to create post:", error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-10 bg-gray-50 dark:bg-gray-900 min-h-screen">
      <h1 className="text-3xl font-bold text-green-800 dark:text-white mb-8 text-center">
        Create a New Post
      </h1>
      <form onSubmit={handleSubmit} className="space-y-6 max-w-lg mx-auto">
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="What's on your mind?"
          className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
          required
        />
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="mb-4"
        />
        {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}
        <button
          type="submit"
          className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition duration-300 w-full"
        >
          Post
        </button>
      </form>
    </div>
  );
};

export default AddPost;
