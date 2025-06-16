import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

// Helper function to handle image paths
const getFullImageUrl = (url) => {
  if (!url) return "https://via.placeholder.com/400x300"; // Fallback image
  return url; // Return the URL as-is
};

const CategoryPage = () => {
  const { categoryId } = useParams(); // Extract category ID or name from URL
  const [plants, setPlants] = useState([]);
  const [categoryInfo, setCategoryInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Fetch category details and plants
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // Fetch all categories
        const categoryResponse = await fetch(
          // "https://localhost:7286/Category"
          "https://greenland.runasp.net/Category"
        );
        if (!categoryResponse.ok) throw new Error("Failed to fetch categories");
        const categoryData = await categoryResponse.json();
        const allCategories = categoryData.value.items || [];

        // Decode and normalize categoryId for comparison
        const decodedCategoryId = decodeURIComponent(categoryId).trim();
        console.log("Decoded Category ID:", decodedCategoryId);

        // Find the selected category
        let selectedCategory;

        // Try matching by name first
        selectedCategory = allCategories.find(
          (cat) =>
            cat.name.trim().toLowerCase() === decodedCategoryId.toLowerCase()
        );

        // If no match by name, try matching by id
        if (!selectedCategory) {
          const categoryIdAsNumber = parseInt(decodedCategoryId, 10);
          selectedCategory = allCategories.find(
            (cat) => cat.id === categoryIdAsNumber
          );
        }

        if (!selectedCategory) {
          console.error("Category not found for ID:", decodedCategoryId);
          throw new Error("Category not found");
        }

        setCategoryInfo(selectedCategory);

        // Fetch plants for the selected category
        const plantResponse = await fetch(
          `https://localhost:7286/Category/${encodeURIComponent(
            selectedCategory.name
          )}/plantByCategoryName`
        );
        if (!plantResponse.ok) throw new Error("Failed to fetch plants");
        const plantData = await plantResponse.json();
        setPlants(plantData.value.items || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [categoryId]);

  // Loading state
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-green-600"></div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="text-center text-red-500 py-10">
        <h1 className="text-2xl font-bold">Oops! Something went wrong.</h1>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="max-w-screen-xl mx-auto p-6">
      {/* Header Section */}
      <section className="mb-12">
        <h2 className="text-4xl font-bold text-center text-green-800 dark:text-white mb-4">
          {categoryInfo?.name}
        </h2>
        <p className="text-center text-gray-700 dark:text-gray-300 text-lg">
          {categoryInfo?.description}
        </p>
      </section>

      {/* Plant Cards Section */}
      <section className="mb-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {plants.length > 0 ? (
            plants.map((plant) => (
              <PlantCard key={plant.id} plant={plant} navigate={navigate} />
            ))
          ) : (
            <p className="col-span-full text-center text-gray-700 dark:text-gray-300">
              No plants available in this category.
            </p>
          )}
        </div>
      </section>
    </div>
  );
};

// Reusable Plant Card Component
const PlantCard = ({ plant, navigate }) => {
  return (
    <div
      className="group bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
      onClick={() => navigate(`/plant/${plant.id}`)}
    >
      {/* Plant Image */}
      <img
        src={getFullImageUrl(plant.imageUrl)} // Use imageUrl directly
        alt={plant.name}
        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
      />

      {/* Plant Details */}
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

          {/* Availability Badge */}
          {plant.is_Available && (
            <span className="bg-green-600 text-white px-2 py-1 rounded-full text-xs shadow-sm">
              Available
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;

// const Categories = () => {
//   const [categories, setCategories] = useState([]);
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const { search: searchQuery } = useContext(SearchContext);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         setLoading(true);

//         const categoryRes = await fetch("https://localhost:7286/Category");
//         if (!categoryRes.ok) throw new Error("Failed to fetch categories");
//         const categoryData = await categoryRes.json();

//         const productRes = await fetch("https://localhost:7286/api/plant");
//         if (!productRes.ok) throw new Error("Failed to fetch products");
//         const productData = await productRes.json();

//         setCategories(categoryData.value.items || []);
//         setProducts(productData.value.items || []);
//       } catch (err) {
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   const filteredCategories = categories.filter((cat) =>
//     cat.name.toLowerCase().startsWith(searchQuery.toLowerCase())
//   );

//   const filteredProducts = products.filter((prod) =>
//     prod.name.toLowerCase().startsWith(searchQuery.toLowerCase())
//   );

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-screen">
//         <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-green-600"></div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="text-center text-red-500 py-10">
//         <h1 className="text-2xl font-bold">Oops! Something went wrong.</h1>
//         <p>{error}</p>
//       </div>
//     );
//   }

//   return (
//     <div className="max-w-screen-xl mx-auto p-6">
//       {/* باقي الكود بدون تغيير كبير، فقط استبدل categories بـ filteredCategories والـ products بـ filteredProducts */}

//       <section className="mb-12">
//         <h2 className="text-3xl font-bold text-center text-green-800 dark:text-white mb-8">
//           Explore Categories
//         </h2>
//         <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
//           {filteredCategories.length > 0 ? (
//             filteredCategories.map((category) => (
//               <CategoryCard
//                 key={category.id}
//                 category={category}
//                 navigate={navigate}
//               />
//             ))
//           ) : (
//             <p className="col-span-full text-center text-gray-700 dark:text-gray-300">
//               No categories available.
//             </p>
//           )}
//         </div>
//       </section>

//       <section className="mb-12">
//         <h2 className="text-3xl font-bold text-center text-green-800 dark:text-white mb-8">
//           Featured Plants
//         </h2>
//         <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
//           {filteredProducts.length > 0 ? (
//             filteredProducts.map((product) => (
//               <ProductCard
//                 key={product.id}
//                 product={product}
//                 navigate={navigate}
//               />
//             ))
//           ) : (
//             <p className="col-span-full text-center text-gray-700 dark:text-gray-300">
//               No products available.
//             </p>
//           )}
//         </div>
//       </section>
