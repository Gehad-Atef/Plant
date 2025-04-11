import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const PlantDetail = () => {
  const [plant, setPlant] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const { id } = useParams(); // Get the plant id from the URL

  useEffect(() => {
    const fetchPlant = async () => {
      try {
        const response = await fetch(`https://localhost:7286/api/Plant/${id}`);
        const data = await response.json();
        console.log(data);
        setPlant(data); // Assuming the plant details are inside 'value'
        setLoading(false);
      } catch (error) {
        console.error("Error fetching plant details:", error);
        setError("Failed to fetch plant details.");
        setLoading(false);
      }
    };

    fetchPlant();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-10">
      {plant && (
        <>
          <h2 className="text-2xl font-bold mb-6">{plant.name}</h2>
          <img
            src={plant.imageUrl}
            alt={plant.name}
            className="w-full h-64 object-cover rounded-lg"
          />
          <p>{plant.description}</p>
          <p>{plant.how_To_Plant}</p>
          <p>Price: ${plant.price}</p>
          <p>Category: {plant.categoryName}</p>
          <p>Available: {plant.is_Available ? "Yes" : "No"}</p>
          <p>Quantity: {plant.quantity}</p>
        </>
      )}
    </div>
  );
};

export default PlantDetail;
