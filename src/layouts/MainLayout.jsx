import SearchBar from "@/components/SearchBar";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <>
      <Navbar />
      <SearchBar />
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default MainLayout;
