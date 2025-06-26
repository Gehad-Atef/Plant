import { useEffect, useState } from "react";
import axios from "axios";
import { useUserContext } from "@/context/UserProvider";
import toast from "react-hot-toast";

function PlantDiseaseDetector() {
  const [image, setImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const { user } = useUserContext();

  useEffect(() => {
    if (!user) {
      setImage(null);
      setPreviewUrl(null);
      setResult(null);
    }
  }, [user]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!user) {
      toast.error("Please login first.");
      return;
    }

    if (file && file.type.startsWith("image/")) {
      setImage(file);
      setPreviewUrl(URL.createObjectURL(file));
      setResult(null);
    } else {
      toast.error("Please select a valid image file.");
    }
  };

  const handleSubmit = async () => {
    if (!image || loading) return;

    const formData = new FormData();
    formData.append("file", image); // ✅ بدل "image"

    console.log("📸 Selected image:", image);
    console.log("📝 File name:", image?.name);
    console.log("📦 FormData entries:");

    for (let pair of formData.entries()) {
      console.log(pair[0], pair[1]);
    }

    try {
      setLoading(true);

      const response = await axios.post(
        "https://localhost:7286/plantdetection/detect",
        formData
        // ❌ مفيش headers هنا، خلي Axios يضبط Content-Type بنفسه
      );

      const data = response.data;

      console.log("✅ Response from fetch:", data);

      if (data.success) {
        setResult(data.data);
        toast.success("Plant detected successfully!");
      } else {
        toast.error(data.message || "Detection failed");
      }
    } catch (error) {
      console.error("Prediction failed:", error.response?.data);
      toast.error(error.response?.data?.message || "Prediction failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-green-50 dark:bg-gray-900 flex flex-col items-center justify-center p-6">
      <h1 className="text-4xl font-bold text-green-700 dark:text-green-300 mb-8 text-center">
        🌿 Plants Disease Detector
      </h1>

      {!result ? (
        <div className="bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-8 w-full max-w-lg">
          <div className="relative w-full h-64 bg-gray-100 dark:bg-gray-700 rounded-xl overflow-hidden mb-4">
            <label className="w-full h-full flex flex-col items-center justify-center text-gray-400 dark:text-gray-300 cursor-pointer">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
              {previewUrl ? (
                <img
                  src={previewUrl}
                  alt="Preview"
                  className="object-cover w-full h-full"
                />
              ) : loading ? (
                <svg
                  className="animate-spin h-16 w-16 text-green-500 mb-2"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                  ></path>
                </svg>
              ) : (
                <>
                  <svg
                    className="w-16 h-16 mb-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 16l4-4-4-4m0 8h18m-7-4l4 4-4 4"
                    />
                  </svg>
                  <p>Upload Plant Photo</p>
                </>
              )}
            </label>
          </div>

          <button
            className={`w-full ${
              !image || loading
                ? "bg-green-300 cursor-not-allowed"
                : "bg-green-500 hover:bg-green-600"
            } text-white font-semibold py-2 rounded-lg transition duration-300`}
            onClick={handleSubmit}
            disabled={!image || loading}
          >
            {loading ? "Detecting..." : "Detect"}
          </button>
        </div>
      ) : (
        <div className="bg-white dark:bg-gray-800 shadow-xl rounded-2xl p-6 w-full max-w-4xl flex flex-col md:flex-row gap-6">
          <div className="md:w-1/2 flex justify-center items-center">
            <img
              src={previewUrl}
              alt="Plant"
              className="rounded-xl object-contain w-full max-h-[400px]"
            />
          </div>

          <div className="md:w-1/2 flex flex-col justify-center space-y-4 text-gray-800 dark:text-gray-200">
            <p>
              <span className="font-bold text-green-700 dark:text-green-300">
                🌱 Name:
              </span>{" "}
              {result.plantName || "Unknown"}
            </p>

            {result.hasDisease ? (
              <>
                <p>
                  <span className="font-bold text-red-600 dark:text-red-400">
                    🦠 Disease:
                  </span>{" "}
                  {result.disease}
                </p>
                <p className="break-words">
                  <span className="font-bold text-yellow-600 dark:text-yellow-400">
                    💊 Treatment:
                  </span>{" "}
                  {result.solution}
                </p>
              </>
            ) : (
              <p className="text-green-600 dark:text-green-300 font-semibold">
                ✅ This plant is healthy.
              </p>
            )}

            <p>
              <span className="font-bold text-blue-600 dark:text-blue-400">
                📊 Accuracy:
              </span>{" "}
              {result.accuracy?.toFixed(2) || "N/A"}%
            </p>

            <div className="pt-6 flex justify-center">
              <button
                className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-6 rounded-lg transition duration-300"
                onClick={() => {
                  setResult(null);
                  setImage(null);
                  setPreviewUrl(null);
                }}
              >
                🔁 Scan Another
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default PlantDiseaseDetector;
