import { useContext, useEffect, useState } from "react";
import { Search, X } from "lucide-react";
import { SearchContext } from "@/context/SearchProvider";
import { useLocation, useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeProvider"; // ✅ تم إضافة هذا

const SearchBar = () => {
    const { search, setSearch, showSearch, setShowSearch } =
        useContext(SearchContext);
    const [visible, setVisible] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const { darkMode } = useTheme(); // ✅ استخدام الوضع الليلي

    useEffect(() => {
        const lowerPath = location.pathname.toLowerCase();
        if (lowerPath.includes("product") || lowerPath.includes("categories")) {
            setVisible(true);
        } else {
            setVisible(false);
        }
    }, [location.pathname]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!search.trim()) return;

        try {
            const res = await fetch("https://greenland.runasp.net/Category");
            const data = await res.json();
            const categories = data.value.items || [];

            const matchedCategory = categories.find(
                (cat) =>
                    cat.name.trim().toLowerCase() ===
                    search.trim().toLowerCase()
            );

            if (matchedCategory) {
                navigate(`/category/${matchedCategory.name}`);
                setShowSearch(false);
                setSearch("");
                return;
            }
        } catch (err) {
            console.error("Failed to fetch categories", err);
        }
    };

    return showSearch && visible ? (
        <div
            className={`border-t border-b text-center transition-all duration-300 ${
                darkMode
                    ? "bg-gray-900 border-gray-700"
                    : "bg-white border-gray-300"
            }`}
        >
            <form
                onSubmit={handleSubmit}
                className={`inline-flex items-center justify-center px-5 py-2 my-5 mx-3 rounded-full w-3/4 sm:w-1/2 border ${
                    darkMode
                        ? "bg-gray-800 text-white border-gray-600"
                        : "bg-white text-black border-gray-400"
                }`}
            >
                <input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className={`flex-1 outline-none bg-inherit text-sm ${
                        darkMode ? "text-white" : "text-black"
                    }`}
                    type="text"
                    placeholder="Search for plant or category"
                />
                <button type="submit">
                    <Search
                        className={`w-4 h-4 ${
                            darkMode ? "text-gray-300" : "text-gray-700"
                        }`}
                    />
                </button>
            </form>
            <X
                onClick={() => {
                    setShowSearch(false);
                    setSearch("");
                }}
                className={`inline w-4 h-4 cursor-pointer ${
                    darkMode ? "text-gray-300" : "text-gray-700"
                }`}
            />
        </div>
    ) : null;
};

export default SearchBar;
