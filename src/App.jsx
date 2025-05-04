import { Routes, Route } from "react-router-dom";

import { AuthGuard, PublicGuard, RoleGuard } from "./routes/ProtectedRoute";

import AuthLayout from "./layouts/AuthLayout";
import Login from "./components/Authentication/Login";
import SignUp from "./components/Authentication/SignUp";
import VerifyEmail from "./components/Authentication/VerifyEmail";
import ChangePassword from "./components/Authentication/ChangePassword";

import MainLayout from "./layouts/MainLayout";
import HomePage from "./components/HomePage";
import AboutUs from "./components/AboutUs";
import Categories from "./components/Categories";
import ContactUs from "./components/ContactUs";
import ProfileCard from "./components/Profile";
import Community from "./components/Community";
import CategoryPage from "./components/CategoryPage";

import Cart from "./components/Cart";
import Checkout from "./components/Checkout";
import PlantList from "./components/plants/PlantList";
import PlantDetail from "./components/plants/PlantDetail";
import AddPost from "./components/Community/AddPost";
import PlantDiseaseDetector from "./components/plants/PlantDiseaseDetector";

function App() {
  return (
    <Routes>
      {/* 🏆 Public Routes - Accessible only if NOT logged in */}
      <Route element={<PublicGuard />}>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />

        <Route element={<AuthLayout />}>
          <Route path="/email" element={<VerifyEmail />} />
          <Route path="/changePass" element={<ChangePassword />} />
        </Route>
      </Route>

      {/* ✅ Public Pages with Layout */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/Categories" element={<Categories />} />
        <Route path="/category/:categoryId" element={<CategoryPage />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/payment" element={<Checkout />} />
        <Route path="/product" element={<PlantList />} />
        <Route path="/plant/:id" element={<PlantDetail />} />
        <Route path="/community" element={<Community />} />
        <Route path="/community/new" element={<AddPost />} />
        <Route path="/detect" element={<PlantDiseaseDetector />} />
      </Route>

      {/* 🔐 Protected Routes - Require Authentication */}
      <Route element={<AuthGuard />}>
        <Route element={<MainLayout />}>
          <Route path="/profile" element={<ProfileCard />} />
        </Route>
      </Route>

      {/* 🛡️ Admin Only Routes */}
      <Route element={<RoleGuard allowedRoles={["Admin"]} />}>
        <Route path="/admin" element={<div>Admin Panel</div>} />
      </Route>

      {/* ❌ Catch-All Route */}
      <Route path="*" element={<div>Not found!</div>} />
    </Routes>
  );
}
export default App;
