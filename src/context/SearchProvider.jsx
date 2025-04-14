import { createContext, useState } from "react";

export const SearchContext = createContext();

export const SearchProvider = (props) => {
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);

  const value = {
    search,
    setSearch,
    showSearch,
    setShowSearch,
  };
  return (
    <SearchContext.Provider value={value}>
      {props.children}
    </SearchContext.Provider>
  );
};
