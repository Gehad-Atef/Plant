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
    const { darkMode } = useTheme();

    const fetchProducts = (page = 1) => {
        axios
            .get(
                `https://greenland.runasp.net/api/Plant?PageNumber=${page}&PageSize=13`
            )
            .then((res) => {
                const data = res.data.value;
                setProducts(data.items);
                setHasNextPage(data.hasNextPage);
                setHasPrevPage(data.hasPreviousPage);
                setPageNumber(page);
            })
            .catch((err) => console.error(err));
    };

    useEffect(() => {
        fetchProducts();
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

        if (!token) {
            console.error("No auth token found.");
            return;
        }

        Promise.all(
            selectedProducts.map((id) =>
                axios.delete(`https://greenland.runasp.net/api/Plant/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
            )
        )
            .then(() => {
                toast.success("Deleted successfully");
                setSelectedProducts([]);
                fetchProducts(pageNumber); // reload same page
            })
            .catch((err) => {
                console.error("Deletion error:", err);
                toast.error("Failed to delete some items");
            });
    };

    const loadNextPage = () => {
        if (hasNextPage) fetchProducts(pageNumber + 1);
    };

    const loadPrevPage = () => {
        if (hasPrevPage) fetchProducts(pageNumber - 1);
    };

    return (
        <div
            className={`p-6 rounded-lg shadow transition-colors duration-300 ${
                darkMode
                    ? "bg-gray-900 text-gray-100"
                    : "bg-white text-gray-900"
            }`}
        >
            <div className="flex justify-between mb-4 items-center">
                <h2 className="text-xl font-semibold">All Products</h2>
                <div className="space-x-2">
                    {/* <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded transition">
            Add
          </button> */}
                    <button
                        onClick={handleDeleteSelected}
                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded transition disabled:opacity-50"
                        disabled={selectedProducts.length === 0}
                    >
                        Delete Selected
                    </button>
                </div>
            </div>

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
                                    onChange={() =>
                                        handleCheckboxChange(prod.id)
                                    }
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

            {/* Pagination Controls */}
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
