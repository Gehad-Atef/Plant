import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useUserContext } from "../context/UserProvider";
import AuthService from "../api/authService";
import toast from "react-hot-toast";

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

// data:
//   error: {code: '', discription: ''}
//   isFailure: false
//   isSuccess: true
//   value:
//     email: "aya.123@gmail.com"
//     expirestIn: 1800
//     fristName: "aya"
//     id: "cd64c48f-7460-43fd-b5a7-8e421fb2ea7e"
//     lastName: ""
//     refreshToken : "H4mCBzFMyp/N2H75JKpj/fAzWu5ogQE9whDZMqs9+TyyhY1p+PCM6Dq8lbYR2kCyESKKQ7Pj/UjsOZa0xvwxvg=="
//     refreshTokenExpiration :  "2025-03-21T22:18:49.7423289Z"
//     token : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJjZDY0YzQ4Zi03NDYwLTQzZmQtYjVhNy04ZTQyMWZiMmVhN2UiLCJlbWFpbCI6Im

/**
 * Hook for Refreshing Token
 */
export const useRefreshToken = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: AuthService.refreshToken,
    onSuccess: (data) => {
      console.log("useRefreshToken", data);
      queryClient.invalidateQueries(["user"]); // Refresh user data if needed
    },
    onError: (error) => {
      console.error("useRefreshToken Error:", error);
      AuthService.logout();
    },
  });
};

/**
 * Hook for Forget Password
 */
export const useForgetPassword = () => {
  return useMutation({
    mutationFn: AuthService.forgetPassword,
    onSuccess: () => {
      alert("Password reset link sent!");
    },
    onError: (error) => {
      console.error("useForgetPassword Error:", error);
      alert(error.response?.data?.message || "Failed to send reset link");
    },
  });
};

/**
 * Hook for Reset Password
 */
export const useResetPassword = () => {
  return useMutation({
    mutationFn: AuthService.resetPassword,
    onSuccess: () => {
      alert("Password reset successful! Please login.");
      window.location.href = "/login";
    },
    onError: (error) => {
      console.error("useResetPassword Error:", error);
      alert(error.response?.data?.message || "Password reset failed");
    },
  });
};
