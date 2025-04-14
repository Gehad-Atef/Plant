import { useContext } from "react";
import { Search, X } from "lucide-react";
import { SearchContext } from "@/context/SearchProvider";
import { useLocation } from "react-router-dom";

import { useState } from "react";
import { useEffect } from "react";

const SearchBar = () => {
  const { search, setSearch, showSearch, setShowSearch } =
    useContext(SearchContext);
  const [visible, setVisible] = useState(false);
  const location = useLocation();
  console.log("search", search);
  useEffect(() => {
    if (
      location.pathname.includes("Product") ||
      location.pathname.includes("Categories")
    ) {
      setVisible(true);
    } else {
      setVisible(false);
    }
    // console.log(location.pathname);
  }, [location]);

  return showSearch && visible ? (
    <div className="border-t border-b bg-white text-center">
      <div className="inline-flex items-center justify-center border border-gray-400 px-5 py-2 my-5 mx-3 rounded-full w-3/4 sm:w-1/2">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 outline-none bg-inherit text-sm"
          type="text"
          placeholder="Search"
        />
        <Search className="w-4 h-4 text-gray-700" />
      </div>
      <X
        onClick={() => {
          setShowSearch(false);
          setSearch("");
        }}
        className="inline w-4 h-4 text-gray-700 cursor-pointer"
      />
    </div>
  ) : null;
};

export default SearchBar;
