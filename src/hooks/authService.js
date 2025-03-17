import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import AuthService from "../api/authService";
import { useUserContext } from "../context/UserProvider";

export const useLogin = () => {
  const { setUser } = useUserContext(); // ✅ Access global user state
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: AuthService.login,
    onSuccess: (data) => {
      if (data.isSuccess) {
        // ✅ Save user data in localStorage to persist after refresh
        localStorage.setItem("user", JSON.stringify(data.value));

        // ✅ Update user state globally
        setUser(data.value);

        // ✅ Invalidate & refetch user data
        queryClient.setQueryData(["userProfile"], data.value); // Set the latest user data
        queryClient.invalidateQueries(["userProfile"]); // Ensure fresh data on next fetch

        // 🎉 Show Success Toast
        toast.success(`Welcome back, ${data.value.fristName}!`);

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
  const navigate = useNavigate();

  return useMutation({
    mutationFn: AuthService.register,
    onSuccess: () => {
      // 🎉 Show Success Toast
      toast.success("Account created successfully! Please log in.");

      // ✅ Redirect to login page
      navigate("/login");
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
  const { setUser } = useUserContext();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      await AuthService.logout();
    },
    onSuccess: () => {
      // ✅ Remove user from global state
      setUser(null);

      // ✅ Invalidate user profile query
      queryClient.invalidateQueries(["userProfile"]);

      // ✅ Show Logout Toast
      toast.success("Logged out successfully!");

      // ✅ Redirect after logout
      navigate("/login");
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
    // staleTime: 0, // Always refetch on each request
    // cacheTime: 0, // Prevent caching old user data
    // refetchOnMount: true, // Refetch when the component mounts
    // refetchOnWindowFocus: true, // Refetch when user focuses on the window
  });
};

// Hook to update profile
export const useUpdateProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: AuthService.updateProfile,
    onSuccess: () => {
      // ✅ Invalidate user data after updating profile
      queryClient.invalidateQueries(["userProfile"]);
      toast.success("Profile updated successfully!");
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

/**
 * Hook for Forgot Password - Sends an email with a reset link
 */
export const useForgotPassword = () => {
  return useMutation({
    mutationFn: AuthService.forgotPassword,
    onSuccess: () => {
      toast.success("Password reset email sent! Check your inbox.");
    },
    onError: () => {
      toast.error("Failed to send password reset email.");
    },
  });
};

/**
 * Hook for Reset Password - Completes the password reset process
 */
export const useResetPassword = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: AuthService.resetPassword,
    onSuccess: () => {
      toast.success("Password reset successfully! You can now log in.");
      navigate("/login");
    },
    onError: () => {
      toast.error("Failed to reset password.");
    },
  });
};
