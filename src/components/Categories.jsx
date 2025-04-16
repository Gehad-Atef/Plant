import { useEffect, useState } from "react";
import heroImage from "../assets/Images/image.png"; // Replace with your actual image path
import featuredImage1 from "../assets/Images/UltimateGuide.png";
import featuredImage2 from "../assets/Images/BestPlant.png";

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch categories and products
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch categories
        const categoryResponse = await fetch("https://localhost:7286/Category");
        if (!categoryResponse.ok) {
          throw new Error("Failed to fetch categories");
        }
        const categoryData = await categoryResponse.json();
        setCategories(categoryData.value.items);

        // Fetch products
        const productResponse = await fetch("https://localhost:7286/api/Plant");
        if (!productResponse.ok) {
          throw new Error("Failed to fetch products");
        }
        const productData = await productResponse.json();
        setProducts(productData.value.items);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

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
      {/* Hero Section */}
      <section className="flex flex-col md:flex-row items-center justify-between bg-green-50 dark:bg-gray-800 rounded-3xl p-8 md:p-12 mb-12 shadow-lg">
        {/* Left Column: Text Content */}
        <div className="w-full md:w-1/2 pr-0 md:pr-10 mb-6 md:mb-0">
          <h1 className="text-4xl md:text-5xl font-bold text-green-800 dark:text-white mb-4">
            Design and Build Your Unique Mini Ecosystem
          </h1>
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
            Everything about plants, from gardening tips and houseplant care to
            exploring different species and their benefits. Your ultimate
            destination for nature and gardening enthusiasts.
          </p>
          <button className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition duration-300">
            Shop Now
          </button>
        </div>

        {/* Right Column: Image */}
        <div className="w-full md:w-1/2 relative overflow-hidden rounded-2xl">
          <img
            src={heroImage} // Replace with the actual path to your image
            alt="Hero Plant"
            className="w-full h-full object-cover"
            style={{ aspectRatio: "1 / 1" }} // Ensures a square aspect ratio
          />
        </div>
      </section>

      {/* Categories Section */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-center text-green-800 dark:text-white mb-8">
          Explore Categories
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          {categories.length > 0 ? (
            categories.map((category, index) => (
              <div
                key={category.id || index}
                className="group bg-white dark:bg-gray-700 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition duration-300"
              >
                <img
                  src={category.imagePath || "placeholder.jpg"}
                  alt={category.name}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-green-800 dark:text-white mb-2">
                    {category.name}
                  </h3>
                  <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition duration-300 w-full">
                    Shop Now
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="col-span-full text-center text-gray-700 dark:text-gray-300">
              No categories available.
            </p>
          )}
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-center text-green-800 dark:text-white mb-8">
          Featured Plants
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.length > 0 ? (
            products.map((product, index) => (
              <div
                key={product.id || index}
                className="group bg-white dark:bg-gray-700 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition duration-300"
              >
                <img
                  src={product.imageUrl || "placeholder.jpg"}
                  alt={product.name}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-green-800 dark:text-white mb-2">
                    {product.name}
                  </h3>
                  <p className="text-green-600 dark:text-green-400 font-bold text-lg mb-2">
                    ${product.price}
                  </p>
                  {product.is_Available && (
                    <span className="bg-green-600 text-white px-2 py-1 rounded-full text-xs">
                      Available
                    </span>
                  )}
                </div>
              </div>
            ))
          ) : (
            <p className="col-span-full text-center text-gray-700 dark:text-gray-300">
              No products available.
            </p>
          )}
        </div>
      </section>

      {/* Featured Articles Section */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-center text-green-800 dark:text-white mb-8">
          Featured Articles
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-gray-700 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition duration-300">
            <img
              src={featuredImage1}
              alt="Featured Article"
              className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="p-6">
              <h3 className="text-xl font-bold text-green-800 dark:text-white mb-4">
                The Ultimate Guide to Low-Maintenance Houseplants
              </h3>
              <p className="text-gray-700 dark:text-gray-300 mb-6">
                Discover how to care for low-maintenance houseplants that thrive
                indoors with minimal effort.
              </p>
              <button className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition duration-300">
                Read More
              </button>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-700 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition duration-300">
            <img
              src={featuredImage2}
              alt="Featured Article"
              className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="p-6">
              <h3 className="text-xl font-bold text-green-800 dark:text-white mb-4">
                Best Plants for Improving Air Quality in Your Home
              </h3>
              <p className="text-gray-700 dark:text-gray-300 mb-6">
                Learn about the top plants that naturally purify the air and
                create a healthier living environment.
              </p>
              <button className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition duration-300">
                Read More
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Categories;
