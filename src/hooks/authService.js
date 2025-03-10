import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";

import AuthService from "../api/authService";
import { useUserContext } from "../context/UserProvider";

export const useLogin = () => {
  const { setUser } = useUserContext(); // ✅ Access global user state
  const navigate = useNavigate();

  return useMutation({
    mutationFn: AuthService.login,
    onSuccess: (data) => {
      if (data.isSuccess) {
        // ✅ Store user info in localStorage
        const user = {
          id: data.value.id,
          email: data.value.email,
          firstName: data.value.fristName,
          lastName: data.value.lastName,
        };
        localStorage.setItem("user", JSON.stringify(user));
        setUser(user); // ✅ Update user state globally

        // 🎉 Show Success Toast
        toast.success(`Welcome back, ${user.firstName}!`);

        // ✅ Navigate to home after login
        navigate("/");
      }
    },
    onError: (error) => {
      console.error("Login Error:", error);

      // ❌ Show Error Toast
      toast.error("Login failed! Please check your credentials.");
    },
  });
};

export const useRegister = () => {
  return useMutation({
    mutationFn: AuthService.register,
    onSuccess: (data) => {
      console.log("Registration Success:", data);

      // 🎉 Show Success Toast
      toast.success("Account created successfully! Please log in.");

      // ✅ Redirect to login page
      setTimeout(() => {
        window.location.href = "/login";
      }, 1500);
    },
    onError: (error) => {
      console.error("Registration Error:", error);

      // ❌ Show Error Toast
      toast.error(
        error.response?.data?.message || "Registration failed. Try again!"
      );
    },
  });
};

export const useLogout = () => {
  const navigate = useNavigate();
  const { setUser } = useUserContext(); // ✅ Clear user from global state

  return useMutation({
    mutationFn: async () => {
      await AuthService.logout();
    },
    onSuccess: () => {
      // ✅ Remove user from global state
      setUser(null);
      localStorage.removeItem("user");

      // ✅ Show Logout Toast
      toast.success("Logged out successfully!");

      // ✅ Redirect after logout
      setTimeout(() => {
        navigate("/login");
      }, 1500);
    },
    onError: (error) => {
      console.error("Logout Error:", error);

      // ❌ Show Error Toast
      toast.error("Logout failed. Please try again!");
    },
  });
};

export const useProfile = () => {
  return useQuery({
    queryKey: ["userProfile"],
    queryFn: AuthService.getProfile,
  });
};

// Hook to update profile
export const useUpdateProfile = () => {
  const { setUser } = useUserContext();

  return useMutation({
    mutationFn: AuthService.updateProfile,
    onSuccess: (data) => {
      toast.success("Profile updated successfully!");
      setUser(data); // Update global state
    },
    onError: () => {
      toast.error("Failed to update profile.");
    },
  });
};

// Hook to change password
export const useChangePassword = () => {
  return useMutation({
    mutationFn: AuthService.changePassword,
    onSuccess: () => {
      toast.success("Password changed successfully!");
    },
    onError: () => {
      toast.error("Failed to change password.");
    },
  });
};
