import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const PlantList = () => {
  const [plants, setPlants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [pageNumber, setPageNumber] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(true);

  const navigate = useNavigate();

  const fetchPlants = async (page) => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://localhost:7286/api/Plant?page=${page}`
      );
      const data = await response.json();

      console.log(`Fetched Page ${page}:`, data);

      if (data.isSuccess && data.value?.items) {
        setPlants(data.value.items); // Replace plants with the new page
        setHasNextPage(data.value.hasNextPage);
        setPageNumber(page); // Update current page
      } else {
        setError("No plants found or invalid API response.");
        setHasNextPage(false);
      }
    } catch (error) {
      console.error("Error fetching plants:", error);
      setError("Failed to fetch plants.");
      setHasNextPage(false);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchPlants(pageNumber); // Fetch first page when component mounts
  }, []);

  const loadNextPage = () => {
    if (hasNextPage) {
      fetchPlants(pageNumber + 1); // Fetch the next page and replace the old plants
    }
  };

  return (
    <div className="container mx-auto px-4 py-10">
      <h2 className="text-2xl font-bold mb-6">Indoor Plants</h2>

      {error && <div className="text-center py-10 text-red-500">{error}</div>}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {plants.length === 0 && !loading ? (
          <div className="col-span-full text-center text-gray-500">
            No plants available at the moment.
          </div>
        ) : (
          plants.map((plant) => (
            <div
              key={plant.id}
              className="bg-white p-4 rounded-lg shadow-lg hover:shadow-xl transition duration-300 ease-in-out cursor-pointer"
              onClick={() => navigate(`/plant/${plant.id}`)}
            >
              <img
                src={plant.imageUrl || "default-image-url.jpg"}
                alt={plant.name}
                className="w-full h-48 object-cover rounded-t-lg"
              />
              <div className="mt-4">
                <h3 className="text-xl font-semibold">{plant.name}</h3>
                <p className="text-green-600 font-bold mt-2">${plant.price}</p>
                <p className="text-sm text-gray-500">{plant.categoryName}</p>
                <p className="text-sm text-gray-500">
                  Quantity: {plant.quantity}
                </p>
                <p className="text-sm text-gray-500">
                  {plant.is_Available ? "In Stock" : "Out of Stock"}
                </p>
              </div>
            </div>
          ))
        )}
      </div>

      {loading && <div className="text-center py-10">Loading...</div>}

      {hasNextPage && !loading && (
        <div className="text-center mt-8">
          <button
            className="text-green-500 font-semibold hover:text-green-700"
            onClick={loadNextPage}
          >
            Next Page →
          </button>
        </div>
      )}
    </div>
  );
};

export default PlantList;
