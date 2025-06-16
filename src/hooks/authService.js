import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import AuthService from "../api/authService";
import { useUserContext } from "../context/UserProvider";

import { jwtDecode } from "jwt-decode";

export const useLogin = () => {
  const { setUser } = useUserContext();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: AuthService.login,
    onSuccess: (data) => {
      if (data.isSuccess) {
        const { token, refreshToken } = data.value;
        const decoded = jwtDecode(token);

        const user = {
          id: data.value.id,
          email: data.value.email,
          userName: `${data.value.fristName} ${data.value.lastName}`,
          role: decoded?.roles?.[0] || "User",
          imagePath: data.value.imageUrl,
        };

        // 🧹 إزالة بيانات المستخدم القديم
        queryClient.removeQueries(["userProfile"], { exact: true });

        // ✅ حفظ في localStorage
        localStorage.setItem("authToken", token);
        localStorage.setItem("refreshToken", refreshToken);
        localStorage.setItem("user", JSON.stringify(user));

        // ✅ تحديث context
        setUser(user);

        // ✅ إعادة تحميل بيانات البروفايل
        queryClient.invalidateQueries(["userProfile"]);

        toast.success(`Welcome back, ${user.userName}!`);

        navigate("/");
      }
    },
    onError: (error) => {
      console.error("Login Error:", error);
      toast.error("Login failed! Please check your credentials.");
    },
  });
};

export const useRegister = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: AuthService.register,
    onSuccess: () => {
      toast.success("Account created successfully! Please log in.");
      navigate("/login");
    },
    onError: (error) => {
      console.error("Registration Error:", error);

      // 🔍 حاول استخراج رسائل التحقق من السيرفر
      const errors = error.response?.data?.errors;

      if (errors && typeof errors === "object") {
        // عرض كل رسالة خطأ في توست منفصل
        Object.values(errors).forEach((messages) => {
          messages.forEach((msg) => toast.error(msg));
        });
      } else {
        // رسالة عامة عند فشل التحقق
        toast.error(
          error.response?.data?.message ||
            "Registration failed. Please check your inputs."
        );
      }
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
      // 🧹 حذف بيانات من localStorage
      localStorage.removeItem("authToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("user");

      // ⬇️ إزالة المستخدم من السياق
      setUser(null);

      // 🧹 حذف بيانات الكاش القديم
      queryClient.removeQueries(["userProfile"], { exact: true });

      toast.success("Logged out successfully!");
      navigate("/login");
    },
    onError: (error) => {
      console.error("Logout Error:", error);
      toast.error("Logout failed. Please try again!");
    },
  });
};

export const useProfile = () => {
  return useQuery({
    queryKey: ["userProfile"],
    queryFn: AuthService.getProfile,
    staleTime: 0,
    cacheTime: 0,
    refetchOnMount: true,
    refetchOnWindowFocus: true,
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
