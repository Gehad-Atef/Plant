// App.jsx
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { useEffect } from "react";

// Layouts and Guards
import { AuthGuard, PublicGuard, RoleGuard } from "./routes/ProtectedRoute";
import AuthLayout from "./layouts/AuthLayout";
import MainLayout from "./layouts/MainLayout";
import AdminLayout from "./layouts/AdminLayout";

// Pages
import Login from "./components/Authentication/Login";
import SignUp from "./components/Authentication/SignUp";
import VerifyEmail from "./components/Authentication/VerifyEmail";
import ChangePassword from "./components/Authentication/ChangePassword";

import HomePage from "./components/HomePage";
import AboutUs from "./components/AboutUs";
import Categories from "./components/Categories";
import ContactUs from "./components/ContactUs";
import CategoryPage from "./components/CategoryPage";
import Cart from "./components/Cart";
import Checkout from "./components/Checkout";
import CardDetails from "./components/CardDetails";
import Success from "./components/Success";
import PlantList from "./components/plants/PlantList";
import PlantDetail from "./components/plants/PlantDetail";
import PlantDiseaseDetector from "./components/plants/PlantDiseaseDetector";

import Community from "./pages/Community";
import MyPosts from "./pages/MyPosts";
import ProfileCard from "./components/Profile";

// Admin pages
import DashboardPage from "./components/Admin/Pages/DashboardPage";
import ProductsPage from "./components/Admin/Pages/ProductsPage";
import CategoriesPage from "./components/Admin/Pages/CategoriesPage";
import CustomersPage from "./components/Admin/Pages/CustomersPage";
import OrdersPage from "./components/Admin/Pages/OrdersPage";

// Modal
import SinglePostModal from "./pages/SinglePostModal";
import NotificationProvider from "./context/NotificationProvider";
import NotificationPage from "./pages/Notification";

function App() {
    const location = useLocation();
    const navigate = useNavigate();

    // 🔧 Handle query string-based modal open from notifications
    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const postId = params.get("post");
        if (postId) {
            navigate(`/post/${postId}`, { replace: true });
        }
    }, [location.search]);

    return (
        <NotificationProvider>
            <Routes location={location} key={location.pathname}>
                {/* 🧑 Public Auth Pages */}
                <Route element={<PublicGuard />}>
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<SignUp />} />
                    <Route element={<AuthLayout />}>
                        <Route path="/email" element={<VerifyEmail />} />
                        <Route
                            path="/changePass"
                            element={<ChangePassword />}
                        />
                    </Route>
                </Route>

                {/* 🛒 Public App Pages */}
                <Route element={<MainLayout />}>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/about" element={<AboutUs />} />
                    <Route path="/categories" element={<Categories />} />
                    <Route
                        path="/category/:categoryId"
                        element={<CategoryPage />}
                    />
                    <Route path="/contact" element={<ContactUs />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/payment" element={<Checkout />} />
                    <Route path="/card-details" element={<CardDetails />} />
                    <Route path="/success" element={<Success />} />
                    <Route path="/product" element={<PlantList />} />
                    <Route path="/plant/:id" element={<PlantDetail />} />
                    <Route path="/community" element={<Community />} />
                    <Route path="/me-posts" element={<MyPosts />} />
                    <Route
                        path="/notifications"
                        element={<NotificationPage />}
                    />
                    <Route path="/detect" element={<PlantDiseaseDetector />} />
                </Route>

                {/* 🔐 Auth-only Pages */}
                <Route element={<AuthGuard />}>
                    <Route element={<MainLayout />}>
                        <Route path="/profile" element={<ProfileCard />} />
                    </Route>
                </Route>

                {/* 🛡️ Admin Routes */}
                <Route element={<RoleGuard allowedRoles={["Admin"]} />}>
                    <Route path="/dashboard" element={<AdminLayout />}>
                        <Route index element={<DashboardPage />} />
                        <Route
                            path="/dashboard/categories"
                            element={<CategoriesPage />}
                        />
                        <Route
                            path="/dashboard/products"
                            element={<ProductsPage />}
                        />
                        <Route
                            path="/dashboard/customers"
                            element={<CustomersPage />}
                        />
                        <Route
                            path="/dashboard/orders"
                            element={<OrdersPage />}
                        />
                    </Route>
                </Route>

                {/* ❌ Catch-All */}
                <Route
                    path="*"
                    element={<div className="text-center p-10">Not found!</div>}
                />
            </Routes>

            {/* 🔳 Modal Layer: Post View */}
            <AnimatePresence>
                {location.pathname.startsWith("/post/") && (
                    <Routes>
                        <Route
                            path="/post/:postId"
                            element={<SinglePostModal />}
                        />
                    </Routes>
                )}
            </AnimatePresence>
        </NotificationProvider>
    );
}

export default App;
