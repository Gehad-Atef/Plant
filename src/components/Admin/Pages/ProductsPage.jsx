import { useEffect, useState } from "react";
import axios from "axios";
import { useTheme } from "../../../context/ThemeProvider";
import toast from "react-hot-toast";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [hasPrevPage, setHasPrevPage] = useState(false);
  const [showAddPopup, setShowAddPopup] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    description: "",
    how_To_Plant: "",
    quantity: "",
    categoryId: "",
    imageFile: null,
  });
  const [categories, setCategories] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const { darkMode } = useTheme();

  const fetchProducts = (page = 1) => {
    axios
      .get(`https://localhost:7286/api/Plant?PageNumber=${page}&PageSize=13`)
      .then((res) => {
        const data = res.data.value;
        setProducts(data.items);
        setHasNextPage(data.hasNextPage);
        setHasPrevPage(data.hasPreviousPage);
        setPageNumber(page);
      })
      .catch((err) => console.error(err));
  };

  const fetchCategories = () => {
    axios
      .get("https://localhost:7286/Category")
      .then((res) => setCategories(res.data.value || []))
      .catch((err) => console.error("Failed to fetch categories", err));
  };

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const handleCheckboxChange = (productId) => {
    setSelectedProducts((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };

  const handleDeleteSelected = () => {
    const token = localStorage.getItem("authToken");
    if (!token) return;

    Promise.all(
      selectedProducts.map((id) =>
        axios.delete(`https://localhost:7286/api/Plant/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
      )
    )
      .then(() => {
        toast.success("Deleted successfully");
        setSelectedProducts([]);
        fetchProducts(pageNumber);
      })
      .catch((err) => {
        console.error("Deletion error:", err);
        toast.error("Failed to delete some items");
      });
  };

  const handleEditSelected = () => {
    const selected = products.find((p) => p.id === selectedProducts[0]);
    if (selected) setEditingProduct(selected);
  };

  const handleEditProduct = async () => {
    const token = localStorage.getItem("authToken");
    if (!token || !editingProduct) return;

    const formData = new FormData();
    formData.append("id", editingProduct.id);
    formData.append("name", editingProduct.name);
    formData.append("price", parseFloat(editingProduct.price));
    formData.append("description", editingProduct.description);
    formData.append("how_To_Plant", editingProduct.how_To_Plant);
    formData.append("quantity", parseInt(editingProduct.quantity));

    const categoryIdToSend =
      editingProduct.categoryId && editingProduct.categoryId !== ""
        ? parseInt(editingProduct.categoryId)
        : products.find((p) => p.id === editingProduct.id)?.categoryId;

    if (categoryIdToSend) {
      formData.append("categoryId", categoryIdToSend);
    }

    formData.append("is_Available", true);
    if (editingProduct.imageFile) {
      formData.append("ImagePath", newProduct.imageFile); // ✅ الاسم الصحيح
    }

    try {
      await axios.put(
        `https://localhost:7286/api/Plant/${editingProduct.id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      toast.success("Product updated successfully");
      setEditingProduct(null);
      fetchProducts();
    } catch (err) {
      console.error("Edit error:", err);
      toast.error("Failed to update product");
    }
  };

  const handleAddProduct = async () => {
    const token = localStorage.getItem("authToken");
    if (!token) return;

    const formData = new FormData();
    formData.append("name", newProduct.name);
    formData.append("price", parseFloat(newProduct.price));
    formData.append("description", newProduct.description);
    formData.append("how_To_Plant", newProduct.how_To_Plant);
    formData.append("quantity", parseInt(newProduct.quantity));
    formData.append("categoryId", newProduct.categoryId);
    formData.append("is_Available", true);
    if (newProduct.imageFile) {
      formData.append("ImagePath", newProduct.imageFile); // ✅ صحيح
    }

    try {
      await axios.post("https://localhost:7286/api/Plant", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success("Product added successfully");
      setShowAddPopup(false);
      setNewProduct({
        name: "",
        price: "",
        description: "",
        how_To_Plant: "",
        quantity: "",
        categoryId: "",
        imageFile: null,
      });
      fetchProducts();
    } catch (err) {
      console.error("Add error:", err);
      toast.error("Failed to add product");
    }
  };

  const loadNextPage = () => hasNextPage && fetchProducts(pageNumber + 1);
  const loadPrevPage = () => hasPrevPage && fetchProducts(pageNumber - 1);

  return (
    <div
      className={`p-6 rounded-lg shadow ${
        darkMode ? "bg-gray-900 text-white" : "bg-white text-black"
      }`}
    >
      <div className="flex justify-between mb-4">
        <h2 className="text-xl font-semibold">All Products</h2>
        <div className="flex flex-col sm:flex-row gap-2">
          <button
            className="bg-green-500 text-white px-4 py-2 rounded"
            onClick={() => setShowAddPopup(true)}
          >
            Add Product
          </button>
          {selectedProducts.length === 1 && (
            <button
              className="bg-yellow-500 text-white px-4 py-2 rounded"
              onClick={handleEditSelected}
            >
              Edit Selected
            </button>
          )}
          {selectedProducts.length > 0 && (
            <button
              className="bg-red-500 text-white px-4 py-2 rounded"
              onClick={handleDeleteSelected}
            >
              Delete Selected
            </button>
          )}
        </div>
      </div>

      {/* Add Product Popup */}
      {showAddPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div
            className={`rounded-lg p-6 w-[90%] md:w-[600px] space-y-4 ${
              darkMode ? "bg-gray-800 text-white" : "bg-white text-black"
            }`}
          >
            <h3 className="text-xl font-bold mb-4">Add Product</h3>
            <div className="grid grid-cols-1 gap-4">
              <input
                type="text"
                placeholder="Name"
                className={`border rounded px-4 py-2 outline-none transition ${
                  darkMode
                    ? "bg-gray-700 text-white border-gray-600 placeholder-gray-400"
                    : "bg-white text-black border-gray-300 placeholder-gray-500"
                }`}
                value={newProduct.name}
                onChange={(e) =>
                  setNewProduct({
                    ...newProduct,
                    name: e.target.value,
                  })
                }
              />
              <input
                type="number"
                placeholder="Price"
                className={`border rounded px-4 py-2 outline-none transition ${
                  darkMode
                    ? "bg-gray-700 text-white border-gray-600 placeholder-gray-400"
                    : "bg-white text-black border-gray-300 placeholder-gray-500"
                }`}
                value={newProduct.price}
                onChange={(e) =>
                  setNewProduct({
                    ...newProduct,
                    price: e.target.value,
                  })
                }
              />
              <textarea
                placeholder="Description"
                className={`border rounded px-4 py-2 outline-none transition ${
                  darkMode
                    ? "bg-gray-700 text-white border-gray-600 placeholder-gray-400"
                    : "bg-white text-black border-gray-300 placeholder-gray-500"
                }`}
                value={newProduct.description}
                onChange={(e) =>
                  setNewProduct({
                    ...newProduct,
                    description: e.target.value,
                  })
                }
              />
              <textarea
                placeholder="How To Plant"
                className={`border rounded px-4 py-2 outline-none transition ${
                  darkMode
                    ? "bg-gray-700 text-white border-gray-600 placeholder-gray-400"
                    : "bg-white text-black border-gray-300 placeholder-gray-500"
                }`}
                value={newProduct.how_To_Plant}
                onChange={(e) =>
                  setNewProduct({
                    ...newProduct,
                    how_To_Plant: e.target.value,
                  })
                }
              />
              <input
                type="number"
                placeholder="Quantity"
                className={`border rounded px-4 py-2 outline-none transition ${
                  darkMode
                    ? "bg-gray-700 text-white border-gray-600 placeholder-gray-400"
                    : "bg-white text-black border-gray-300 placeholder-gray-500"
                }`}
                value={newProduct.quantity}
                onChange={(e) =>
                  setNewProduct({
                    ...newProduct,
                    quantity: e.target.value,
                  })
                }
              />
              <select
                className={`border rounded px-4 py-2 outline-none transition ${
                  darkMode
                    ? "bg-gray-700 text-white border-gray-600"
                    : "bg-white text-black border-gray-300"
                }`}
                value={newProduct.categoryId}
                onChange={(e) =>
                  setNewProduct({
                    ...newProduct,
                    categoryId: e.target.value,
                  })
                }
              >
                <option value="">Select Category</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
              <input
                type="file"
                className={`border rounded px-4 py-2 file:cursor-pointer ${
                  darkMode ? "text-white" : "text-black"
                }`}
                onChange={(e) =>
                  setNewProduct({
                    ...newProduct,
                    imageFile: e.target.files[0],
                  })
                }
              />
            </div>
            <div className="flex justify-end gap-4 mt-4">
              <button
                onClick={() => {
                  setShowAddPopup(false);
                  setNewProduct({
                    name: "",
                    price: "",
                    description: "",
                    how_To_Plant: "",
                    quantity: "",
                    categoryId: "",
                    imageFile: null,
                  });
                }}
                className="bg-gray-400 hover:bg-gray-400 px-4 py-2 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleAddProduct}
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
              >
                Add Product
              </button>
            </div>
          </div>
        </div>
      )}

      {editingProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div
            className={`rounded-lg p-6 w-[90%] md:w-[600px] space-y-4 ${
              darkMode ? "bg-gray-800 text-white" : "bg-white text-black"
            }`}
          >
            <h3 className="text-xl font-bold mb-4">Edit Product</h3>
            <div className="grid grid-cols-1 gap-4">
              <input
                type="text"
                placeholder="Name"
                className={`border rounded px-4 py-2 outline-none transition ${
                  darkMode
                    ? "bg-gray-700 text-white border-gray-600 placeholder-gray-400"
                    : "bg-white text-black border-gray-300 placeholder-gray-500"
                }`}
                value={editingProduct.name}
                onChange={(e) =>
                  setEditingProduct({
                    ...editingProduct,
                    name: e.target.value,
                  })
                }
              />
              <input
                type="number"
                placeholder="Price"
                className={`border rounded px-4 py-2 outline-none transition ${
                  darkMode
                    ? "bg-gray-700 text-white border-gray-600 placeholder-gray-400"
                    : "bg-white text-black border-gray-300 placeholder-gray-500"
                }`}
                value={editingProduct.price}
                onChange={(e) =>
                  setEditingProduct({
                    ...editingProduct,
                    price: e.target.value,
                  })
                }
              />
              <textarea
                placeholder="Description"
                className={`border rounded px-4 py-2 outline-none transition ${
                  darkMode
                    ? "bg-gray-700 text-white border-gray-600 placeholder-gray-400"
                    : "bg-white text-black border-gray-300 placeholder-gray-500"
                }`}
                value={editingProduct.description}
                onChange={(e) =>
                  setEditingProduct({
                    ...editingProduct,
                    description: e.target.value,
                  })
                }
              />
              <textarea
                placeholder="How To Plant"
                className={`border rounded px-4 py-2 outline-none transition ${
                  darkMode
                    ? "bg-gray-700 text-white border-gray-600 placeholder-gray-400"
                    : "bg-white text-black border-gray-300 placeholder-gray-500"
                }`}
                value={editingProduct.how_To_Plant}
                onChange={(e) =>
                  setEditingProduct({
                    ...editingProduct,
                    how_To_Plant: e.target.value,
                  })
                }
              />
              <input
                type="number"
                placeholder="Quantity"
                className={`border rounded px-4 py-2 outline-none transition ${
                  darkMode
                    ? "bg-gray-700 text-white border-gray-600 placeholder-gray-400"
                    : "bg-white text-black border-gray-300 placeholder-gray-500"
                }`}
                value={editingProduct.quantity}
                onChange={(e) =>
                  setEditingProduct({
                    ...editingProduct,
                    quantity: e.target.value,
                  })
                }
              />
              <select
                className={`border rounded px-4 py-2 outline-none transition ${
                  darkMode
                    ? "bg-gray-700 text-white border-gray-600"
                    : "bg-white text-black border-gray-300"
                }`}
                value={
                  editingProduct.categoryId
                    ? editingProduct.categoryId.toString()
                    : ""
                }
                onChange={(e) =>
                  setEditingProduct({
                    ...editingProduct,
                    categoryId: e.target.value,
                  })
                }
              >
                <option
                  value={
                    editingProduct.categoryId
                      ? editingProduct.categoryId.toString()
                      : ""
                  }
                >
                  {categories.find(
                    (cat) =>
                      cat.id.toString() ===
                      editingProduct.categoryId?.toString()
                  )?.name || "Select Category"}
                </option>
                {categories
                  .filter(
                    (cat) =>
                      cat.id.toString() !==
                      editingProduct.categoryId?.toString()
                  )
                  .map((cat) => (
                    <option key={cat.id} value={cat.id.toString()}>
                      {cat.name}
                    </option>
                  ))}
              </select>
            </div>
            <div className="flex justify-end gap-4 mt-4">
              <button
                onClick={() => setEditingProduct(null)}
                className="bg-gray-400 hover:bg-gray-500 text-black px-4 py-2 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleEditProduct}
                className="bg-green-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

      <table className="w-full table-auto">
        <thead>
          <tr className="text-left border-b dark:border-gray-700">
            <th className="py-2"></th>
            <th className="py-2">Name</th>
            <th className="py-2">Category</th>
            <th className="py-2">Price</th>
            <th className="py-2">Quantity</th>
          </tr>
        </thead>
        <tbody>
          {products.map((prod) => (
            <tr
              key={prod.id}
              className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition"
            >
              <td className="py-2">
                <input
                  type="checkbox"
                  checked={selectedProducts.includes(prod.id)}
                  onChange={() => handleCheckboxChange(prod.id)}
                />
              </td>
              <td className="py-2">{prod.name}</td>
              <td className="py-2">{prod.categoryName}</td>
              <td className="py-2">${prod.price}</td>
              <td className="py-2">{prod.quantity}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex justify-center mt-6 space-x-4">
        {hasPrevPage && (
          <button
            className="flex items-center gap-2 text-green-600 font-semibold hover:text-green-800 transition duration-300"
            onClick={loadPrevPage}
          >
            &larr; Prev Page
          </button>
        )}
        {hasNextPage && (
          <button
            className="flex items-center gap-2 text-green-600 font-semibold hover:text-green-800 transition duration-300"
            onClick={loadNextPage}
          >
            Next Page &rarr;
          </button>
        )}
      </div>
    </div>
  );
}
