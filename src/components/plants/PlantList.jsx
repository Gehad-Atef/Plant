import { SearchContext } from "@/context/SearchProvider";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const PlantList = () => {
    const [plants, setPlants] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [pageNumber, setPageNumber] = useState(1);
    const [hasNextPage, setHasNextPage] = useState(false);
    const [hasPrevPage, setHasPrevPage] = useState(false);

    const { search: searchQuery } = useContext(SearchContext);
    const navigate = useNavigate();

    // Helper function to handle image paths
    const getFullImageUrl = (url) => {
        if (!url) return "https://via.placeholder.com/400x300"; // Fallback image
        return url; // Return the URL as-is
    };

    const fetchPlants = async (page) => {
        setLoading(true);
        try {
            const response = await fetch(
                `https://greenland.runasp.net/api/Plant?PageNumber=${page}&PageSize=8`
            );
            // const response = await fetch(
            //     `https://localhost:7286/api/Plant?PageNumber=${page}&PageSize=8`
            // );
            const data = await response.json();

            if (data.isSuccess && data.value?.items) {
                setPlants(data.value.items);
                setHasNextPage(data.value.hasNextPage);
                setHasPrevPage(data.value.hasPreviousPage);
                setPageNumber(page);
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
        if (searchQuery.trim() !== "") {
            const handleSearch = async () => {
                setLoading(true);
                try {
                    // const response = await fetch(
                    //     `https://localhost:7286/api/Plant/GetByName?Name=${encodeURIComponent(
                    //         searchQuery
                    //     )}`
                    // );
                    const response = await fetch(
                        `https://greenland.runasp.net/api/Plant/GetByName?Name=${encodeURIComponent(
                            searchQuery
                        )}`
                    );
                    const data = await response.json();
                    if (response.ok) {
                        const items = Array.isArray(data) ? data : [data];
                        setPlants(items);
                        setHasNextPage(false); // Disable pagination on search
                        setError("");
                    } else {
                        setPlants([]);
                        setError("No plant found.");
                    }
                } catch (err) {
                    console.error("Search error:", err);
                    setError("Error searching for plant.");
                }
                setLoading(false);
            };

            handleSearch();
        } else {
            fetchPlants(pageNumber); // Fetch plants if no search query
        }
    }, [searchQuery, pageNumber]);

    const loadNextPage = () => {
        if (hasNextPage) {
            setPageNumber((prevPage) => prevPage + 1);
        }
    };

    const loadPrevPage = () => {
        if (hasPrevPage) {
            setPageNumber((currPage) => currPage - 1);
        }
    };

    return (
        <div className="container mx-auto px-4 py-10">
            {/* Error Message */}
            {error && plants.length === 0 && (
                <div className="text-center py-10 text-red-500">{error}</div>
            )}

            {/* Plant Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {loading ? (
                    // Skeleton Loader
                    Array.from({ length: 8 }).map((_, index) => (
                        <div
                            key={index}
                            className="w-full h-96 bg-gray-200 animate-pulse rounded-lg"
                        ></div>
                    ))
                ) : plants.length === 0 ? (
                    <div className="col-span-full text-center text-gray-500">
                        No plants available at the moment.
                    </div>
                ) : (
                    plants.map((plant) => (
                        <div
                            key={plant.id}
                            className="group bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition duration-300 transform hover:-translate-y-1"
                            onClick={() => navigate(`/plant/${plant.id}`)}
                        >
                            {/* Image Section */}
                            <div className="relative w-full h-48 overflow-hidden">
                                <img
                                    src={getFullImageUrl(plant.imageUrl)}
                                    alt={plant.name}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                    onError={(e) => {
                                        e.target.src =
                                            "https://via.placeholder.com/400x300"; // Fallback image
                                        e.target.onerror = null;
                                    }}
                                />
                                {/* Availability Badge */}
                                <span
                                    className={`absolute top-2 right-2 px-3 py-1 rounded-full text-sm font-medium ${
                                        plant.is_Available
                                            ? "bg-green-600 text-white"
                                            : "bg-red-600 text-white"
                                    }`}
                                >
                                    {plant.is_Available
                                        ? "Available"
                                        : "Out of Stock"}
                                </span>
                            </div>

                            {/* Details Section */}
                            <div className="p-4">
                                <h3 className="text-lg font-semibold text-green-800 dark:text-white mb-2">
                                    {plant.name}
                                </h3>
                                <p className="text-sm text-gray-700 dark:text-gray-300 line-clamp-3 mb-2">
                                    {plant.description}
                                </p>
                                <div className="flex justify-between items-center">
                                    {/* Price Tag */}
                                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-sm font-medium">
                                        ${plant.price.toFixed(2)}
                                    </span>
                                    {/* Category Name */}
                                    <p className="text-xs text-gray-500 dark:text-gray-400">
                                        {plant.categoryName}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* Pagination */}
            <div className="flex justify-center mt-8 space-x-4">
                {hasPrevPage && !loading && !searchQuery && (
                    <button
                        className="flex items-center gap-2 text-green-600 font-semibold hover:text-green-800 transition duration-300"
                        onClick={loadPrevPage}
                    >
                        <ArrowLeft className="w-5 h-5" /> Prev Page
                    </button>
                )}
                {hasNextPage && !loading && !searchQuery && (
                    <button
                        className="flex items-center gap-2 text-green-600 font-semibold hover:text-green-800 transition duration-300"
                        onClick={loadNextPage}
                    >
                        Next Page <ArrowRight className="w-5 h-5" />
                    </button>
                )}
            </div>
        </div>
    );
};

export default PlantList;
