import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

export default function CategoryPage() {
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [showAddPopup, setShowAddPopup] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [newCategory, setNewCategory] = useState({
    name: "",
    description: "",
    imageFile: null,
  });

  const fetchCategories = () => {
    axios
      .get("https://localhost:7286/Category")
      .then((res) => setCategories(res.data.value || []))
      .catch((err) => console.error("Failed to fetch categories", err));
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleCheckboxChange = (categoryId) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const handleDeleteSelected = () => {
    const token = localStorage.getItem("authToken");
    if (!token) return;

    Promise.all(
      selectedCategories.map((id) =>
        axios.delete(`https://localhost:7286/Category/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
      )
    )
      .then(() => {
        toast.success("Deleted successfully");
        setSelectedCategories([]);
        fetchCategories();
      })
      .catch((err) => {
        console.error("Delete error:", err);
        toast.error("Failed to delete category");
      });
  };

  const handleAddCategory = async () => {
    const token = localStorage.getItem("authToken");
    if (!token) return;

    const formData = new FormData();
    formData.append("Name", newCategory.name); // 🟢 اسم الحقل يجب أن يطابق الـ C# case
    formData.append("Description", newCategory.description);

    if (newCategory.imageFile) {
      formData.append("ImagePath", newCategory.imageFile); // 🛠️ هذا هو التعديل المطلوب
    }

    try {
      await axios.post("https://localhost:7286/Category", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success("Category added successfully");
      setShowAddPopup(false);
      setNewCategory({ name: "", description: "", imageFile: null });
      fetchCategories();
    } catch (err) {
      console.error("Add error:", err);
      toast.error("Failed to add category");
    }
  };

  const handleEditCategory = async () => {
    const token = localStorage.getItem("authToken");
    if (!token || !editingCategory) return;

    const formData = new FormData();
    formData.append("Name", newCategory.name);
    formData.append("Description", newCategory.description);
    if (newCategory.imageFile) {
      formData.append("ImagePath", newCategory.imageFile); // ✅ مطابق تمامًا لـ ASP.NET
    }

    try {
      await axios.put(
        `https://localhost:7286/Category/${editingCategory.id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      toast.success("Category updated successfully");
      setEditingCategory(null);
      fetchCategories();
    } catch (err) {
      console.error("Edit error:", err);
      toast.error("Failed to update category");
    }
  };

  const handleEditSelected = () => {
    const selected = categories.find((c) => c.id === selectedCategories[0]);
    if (selected) setEditingCategory(selected);
  };

  return (
    <div className="p-4 sm:p-6 rounded-lg shadow bg-white text-black max-w-6xl mx-auto">
      {/* Header & Actions */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-4">
        <h2 className="text-xl font-semibold">All Categories</h2>
        <div className="flex flex-col sm:flex-row gap-2">
          <button
            className="bg-green-500 text-white px-4 py-2 rounded"
            onClick={() => setShowAddPopup(true)}
          >
            Add Category
          </button>
          {selectedCategories.length === 1 && (
            <button
              className="bg-yellow-500 text-white px-4 py-2 rounded"
              onClick={handleEditSelected}
            >
              Edit Selected
            </button>
          )}
          {selectedCategories.length > 0 && (
            <button
              className="bg-red-500 text-white px-4 py-2 rounded"
              onClick={handleDeleteSelected}
            >
              Delete Selected
            </button>
          )}
        </div>
      </div>

      {/* Add Category Popup */}
      {showAddPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-[90%] md:w-[500px] max-h-[90vh] overflow-y-auto">
            <h3 className="text-xl font-bold mb-4">Add Category</h3>
            <input
              type="text"
              placeholder="Name"
              className="border rounded px-4 py-2 mb-3 w-full"
              value={newCategory.name}
              onChange={(e) =>
                setNewCategory({
                  ...newCategory,
                  name: e.target.value,
                })
              }
            />
            <textarea
              placeholder="Description"
              className="border rounded px-4 py-6 mb-3 w-full"
              value={newCategory.description}
              onChange={(e) =>
                setNewCategory({
                  ...newCategory,
                  description: e.target.value,
                })
              }
            />
            <input
              type="file"
              className="mb-4"
              onChange={(e) =>
                setNewCategory({
                  ...newCategory,
                  imageFile: e.target.files[0],
                })
              }
            />
            <div className="flex justify-end gap-2">
              <button
                className="px-4 py-2 bg-gray-300 rounded"
                onClick={() => {
                  setShowAddPopup(false);
                  setNewCategory({
                    name: "",
                    description: "",
                    imageFile: null,
                  });
                }}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-green-500 text-white rounded"
                onClick={handleAddCategory}
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Category Popup */}
      {editingCategory && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-[90%] md:w-[500px] max-h-[90vh] overflow-y-auto">
            <h3 className="text-xl font-bold mb-4">Edit Category</h3>
            <input
              type="text"
              className="border rounded px-4 py-2 mb-3 w-full"
              value={editingCategory.name}
              onChange={(e) =>
                setEditingCategory({
                  ...editingCategory,
                  name: e.target.value,
                })
              }
            />
            <textarea
              className="border rounded px-4 py-6 mb-3 w-full"
              value={editingCategory.description}
              onChange={(e) =>
                setEditingCategory({
                  ...editingCategory,
                  description: e.target.value,
                })
              }
            />
            <div className="flex justify-end gap-2">
              <button
                className="px-4 py-2 bg-gray-300 rounded"
                onClick={() => setEditingCategory(null)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded"
                onClick={handleEditCategory}
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Categories Table */}
      <div className="overflow-x-auto">
        <table className="w-full table-auto mt-4">
          <thead>
            <tr className="text-left border-b">
              <th className="py-2 px-2"></th>
              <th className="py-2 px-2">Name</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((cat) => (
              <tr key={cat.id} className="border-b hover:bg-gray-50 transition">
                <td className="py-2 px-2">
                  <input
                    type="checkbox"
                    checked={selectedCategories.includes(cat.id)}
                    onChange={() => handleCheckboxChange(cat.id)}
                  />
                </td>
                <td className="py-2 px-2">{cat.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
