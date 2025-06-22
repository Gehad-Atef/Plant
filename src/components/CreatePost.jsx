import { useState } from "react";
import axios from "../utils/axiosInstance";

export default function CreatePost() {
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("content", content);
    if (image) formData.append("Image", image);

    try {
      await axios.post("https://localhost:7286//api/posts", formData);
      setContent("");
      setImage(null);
      window.location.reload();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow space-y-4"
    >
      <textarea
        className="w-full border border-gray-300 dark:border-gray-700 dark:bg-gray-900 rounded p-3 resize-none text-sm text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500"
        placeholder="Share your experience..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
        rows={3}
        required
      />

      <div className="flex items-center justify-between">
        <label className="cursor-pointer text-sm text-gray-600 dark:text-gray-300 hover:text-green-600">
          📷 Choose image
          <input
            type="file"
            onChange={(e) => setImage(e.target.files[0])}
            className="hidden"
          />
        </label>

        {image && (
          <span className="text-xs text-gray-500 dark:text-gray-400">
            {image.name}
          </span>
        )}
      </div>

      <div className="text-right">
        <button
          type="submit"
          className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded shadow text-sm transition duration-200"
        >
          Post
        </button>
      </div>
    </form>
  );
}
