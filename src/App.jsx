import { Routes, Route } from "react-router-dom";

import HomePage from "./components/HomePage";
import Login from "./components/Authentication/Login";
import SignUp from "./components/Authentication/SignUp";
import AboutUs from "./components/AboutUs";
import ContactUs from "./components/ContactUs";
import ProfileCard from "./components/Profile";
import VerifyEmail from "./components/Authentication/VerifyEmail";
import ChangePassword from "./components/Authentication/ChangePassword";

import { AuthGuard, PublicGuard, RoleGuard } from "./routes/ProtectedRoute";
import MainLayout from "./layouts/MainLayout";
import AuthLayout from "./layouts/AuthLayout";

function App() {
  return (
    <Routes>
      {/* 🏆 Public Routes - Accessible only if NOT logged in */}
      <Route element={<PublicGuard />}>
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
        </Route>
      </Route>

      {/* ✅ Public Pages with Layout */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/contact" element={<ContactUs />} />
      </Route>

      {/* ✅ Always Public Pages */}
      <Route path="/email" element={<VerifyEmail />} />
      <Route path="/changePass" element={<ChangePassword />} />

      {/* 🔐 Protected Routes - Require Authentication */}
      <Route element={<AuthGuard />}>
        <Route path="/profile" element={<ProfileCard />} />
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
