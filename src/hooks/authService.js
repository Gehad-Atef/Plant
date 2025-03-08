import AuthService from "../api/authService";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useUserContext } from "../context/UserProvider";
import { useNavigate } from "react-router-dom";

export const useLogin = () => {
  const { setUser } = useUserContext(); // ✅ Now available!
  const navigate = useNavigate();

  return useMutation({
    mutationFn: AuthService.login,
    onSuccess: (data) => {
      if (data.isSuccess) {
        // Store user info
        const user = {
          id: data.value.id,
          email: data.value.email,
          firstName: data.value.fristName,
          lastName: data.value.lastName,
        };
        localStorage.setItem("user", JSON.stringify(user));
        setUser(user); // ✅ Update global user state

        // ✅ Navigate to home after login
        navigate("/");
      }
    },
    onError: (error) => {
      console.error("Login Error:", error);
      alert(error.response?.data?.message || "Login failed");
    },
  });
};

/**
 * Hook for Registration
 */
export const useRegister = () => {
  return useMutation({
    mutationFn: AuthService.register,
    onSuccess: (data) => {
      alert("Registration successful! Please login.");
      console.log("useRegister Success:", data);
      window.location.href = "/login";
    },
    onError: (error) => {
      console.log("useRegister Error:", error);
      alert(error.response?.data?.message || "Registration failed");
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

/**
 * Hook for Logout
 */
export const useLogout = () => {
  return () => {
    AuthService.logout();
  };
};
