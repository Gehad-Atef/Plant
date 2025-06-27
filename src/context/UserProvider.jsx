import { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

const UserContext = createContext(undefined); // ← تعديل هنا

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
    toast.success("Logged in successfully!");
  };

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
    toast.success("Logged out successfully!");
  };

  const value = {
    user,
    setUser,
    isLoading,
    isAuthenticated: !!user,
    login,
    logout,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUserContext must be used within a UserProvider");
  }
  return context;
};
