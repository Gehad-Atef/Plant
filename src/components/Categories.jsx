import { useEffect, useState } from "react";

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const categoryResponse = await fetch("https://localhost:7286/Category");
        const productResponse = await fetch("https://localhost:7286/api/Plant");

        if (!categoryResponse.ok || !productResponse.ok) {
          throw new Error("Failed to fetch data");
        }

        const categoryData = await categoryResponse.json();
        const productData = await productResponse.json();

        console.log("Fetched categoryData:", categoryData);
        console.log("Fetched productData:", productData);

        // Ensure both are arrays
        setCategories(Array.isArray(categoryData) ? categoryData : []);
        setProducts(Array.isArray(productData) ? productData : []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading)
    return (
      <p className="text-center text-gray-700 dark:text-gray-300">Loading...</p>
    );
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="max-w-screen-xl mx-auto p-6">
      {/* Hero Section */}
      <div className="relative flex items-center bg-green-100 dark:bg-gray-800 p-10 rounded-lg shadow-md mb-12 overflow-hidden">
        <div className="w-1/2">
          <h1 className="text-5xl font-bold mb-4 text-gray-900 dark:text-white">
            Design and Build Your Unique Mini Ecosystem
          </h1>
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
            Everything about plants, from gardening tips and houseplant care to
            exploring different species and their benefits.
          </p>
          <button className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition">
            Shop Now
          </button>
        </div>
        <div className="w-1/2 flex justify-end relative">
          <img
            src="your-image.jpg"
            alt="Hero Background"
            className="absolute right-0 top-1/2 transform -translate-y-1/2 w-96 h-auto object-cover rounded-lg"
            loading="lazy"
          />
        </div>
      </div>

      {/* Category Section */}
      <h2 className="text-4xl font-bold text-center mb-8 text-gray-900 dark:text-white">
        Categories
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {Array.isArray(categories) &&
          categories.map((category, index) => (
            <div
              key={category.id || index}
              className="bg-gray-100 dark:bg-gray-700 rounded-lg flex flex-col items-center p-4 hover:shadow-lg transition"
            >
              <img
                src={category.imagePath}
                alt={category.name}
                className="w-40 h-40 object-cover rounded-md mb-4"
                loading="lazy"
              />
              <h2 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                {category.name}
              </h2>
              <button className="bg-green-600 text-white px-5 py-2 rounded-lg hover:bg-green-700 transition">
                Shop Now
              </button>
            </div>
          ))}
      </div>

      {/* Featured Products Section */}
      <h2 className="text-3xl font-bold text-center mt-12 mb-6 text-gray-900 dark:text-white">
        Featured Products
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {products.map((product, index) => (
          <div
            key={product.id || index}
            className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-4 flex flex-col items-center hover:shadow-xl transition"
          >
            <img
              src={product.imageUrl}
              alt={product.name}
              className="w-40 h-40 object-cover rounded-md mb-4"
              loading="lazy"
            />
            <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">
              {product.name}
            </h3>
            <p className="text-green-700 dark:text-green-400 font-bold text-lg">
              ৳{product.price}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;
