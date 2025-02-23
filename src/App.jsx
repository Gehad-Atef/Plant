import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import HomePage from "./components/HomePage";
import Login from "./components/Authentication/Login";
import SignUp from "./components/Authentication/SignUp";
import AboutUs from "./components/AboutUs";
import ContactUs from "./components/ContactUs";
import ProfileCard from "./components/Profile";
import VerifyEmail from "./components/Authentication/VerifyEmail";
import ChangePassword from "./components/Authentication/ChangePassword";

function App() {
  return (
    <Router>
      <div className="bg-gray-100 min-h-screen">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/profile" element={<ProfileCard />} />
          <Route path="/email" element={<VerifyEmail />} />
          <Route path="/changePass" element={<ChangePassword />} />
        </Routes>
      </div>
    </Router>
  );
}
export default App;
