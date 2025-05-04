import { useState } from "react";
import axios from "axios";

function PlantDiseaseDetector() {
  const [image, setImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setPreviewUrl(URL.createObjectURL(file));
    setResult(null);
  };

  const handleSubmit = async () => {
    if (!image) return;

    const formData = new FormData();
    formData.append("file", image);

    try {
      setLoading(true);
      const response = await axios.post(
        "https://localhost:7286/api/plantdetection/detect",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setResult(response.data);
    } catch (error) {
      console.error("Prediction failed:", error);
      alert("Prediction failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-green-50 flex flex-col items-center justify-center p-6">
      <h1 className="text-4xl font-bold text-green-700 mb-8 text-center">
        🌿 Plants Disease Detector
      </h1>

      {!result ? (
        <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-lg">
          <div className="relative w-full h-64 bg-gray-100 rounded-xl overflow-hidden mb-4">
            {previewUrl ? (
              <img
                src={previewUrl}
                alt="Preview"
                className="object-cover w-full h-full"
              />
            ) : (
              <label className="w-full h-full flex flex-col items-center justify-center text-gray-400 cursor-pointer">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
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
              </label>
            )}
          </div>

          <button
            className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2 rounded-lg transition duration-300"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? "Detecting..." : "Detect"}
          </button>
        </div>
      ) : (
        <div className="bg-white shadow-xl rounded-2xl p-6 w-full max-w-4xl flex flex-col md:flex-row gap-6">
          <div className="md:w-1/2 flex justify-center items-center">
            <img
              src={previewUrl}
              alt="Plant"
              className="rounded-xl object-contain w-full max-h-[400px]"
            />
          </div>

          <div className="md:w-1/2 flex flex-col justify-center space-y-4">
            <p>
              <span className="font-bold text-green-700">🌱 Name:</span>{" "}
              {result.plantName}
            </p>
            <p>
              <span className="font-bold text-red-600">🦠 Disease:</span>{" "}
              {result.disease}
            </p>
            <p className="break-words">
              <span className="font-bold text-yellow-600">💊 Treatment:</span>{" "}
              {result.solution}
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
