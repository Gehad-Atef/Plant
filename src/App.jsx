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
import ContactUs from "./components/ContactUs";
import ProfileCard from "./components/Profile";

import Cart from "./components/Cart";
import Checkout from "./components/Checkout";

function App() {
  return (
    <Routes>
      {/* 🏆 Public Routes - Accessible only if NOT logged in */}
      <Route element={<PublicGuard />}>
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />

          <Route path="/email" element={<VerifyEmail />} />
          <Route path="/changePass" element={<ChangePassword />} />
        </Route>
      </Route>

      {/* ✅ Public Pages with Layout */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/payment" element={<Checkout />} />
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
