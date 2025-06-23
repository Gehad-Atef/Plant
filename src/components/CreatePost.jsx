import { useState } from "react";
import axios from "../utils/axiosInstance";
import toast from "react-hot-toast";

export default function CreatePost() {
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content.trim() && !image) {
      toast.error("Write something or choose an image.");
      return;
    }

    const formData = new FormData();
    formData.append("content", content);
    if (image) formData.append("ImagePath", image);

    try {
      await axios.post("https://localhost:7286/api/posts", formData, {
        withCredentials: true,
      });
      toast.success("Post shared!");
      setContent("");
      setImage(null);
      window.location.reload();
    } catch (err) {
      console.error(err);
      toast.error("Failed to create post.");
    }
  };

  return (
    <div className="flex justify-center mb-6">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-2xl bg-white dark:bg-gray-900 shadow rounded-xl p-4 border border-gray-200 dark:border-gray-700 space-y-4"
      >
        {/* Header */}
        <div className="flex items-start gap-3">
          <textarea
            className="flex-1 border border-gray-300 dark:border-gray-700 dark:bg-gray-800 rounded p-3 resize-none text-sm text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="What's on your mind?"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={3}
          />
        </div>

        {/* Image Upload */}
        <div className="flex justify-between items-center flex-wrap gap-2 text-sm text-gray-600 dark:text-gray-300">
          <label className="cursor-pointer hover:text-green-600">
            📷 Upload image
            <input
              type="file"
              onChange={(e) => setImage(e.target.files[0])}
              accept="image/*"
              className="hidden"
            />
          </label>

          {image && (
            <span className="text-xs truncate max-w-xs">{image.name}</span>
          )}
        </div>

        {/* Preview */}
        {image && (
          <div className="w-full">
            <img
              src={URL.createObjectURL(image)}
              alt="Preview"
              className="mt-2 max-h-[300px] w-full object-contain rounded border"
            />
          </div>
        )}

        {/* Submit */}
        <div className="text-right">
          <button
            type="submit"
            className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded shadow text-sm transition duration-200"
          >
            Share
          </button>
        </div>
      </form>
    </div>
  );
}
