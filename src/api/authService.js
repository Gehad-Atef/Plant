import axiosInstance from "./client";

/**
 * Authentication Service
 */
const AuthService = {
  /**
   * Get current authenticated user
   */
  getUser: async () => {
    try {
      const response = await axiosInstance.get("me");
      console.log("getUser", response.data);
      return response.data.value; // Ensure we return only the user object
    } catch (error) {
      console.error("Get User Error:", error);
      throw error;
    }
  },

  /**
   * Login function - Authenticates a user and stores tokens
   */
  login: async (credentials) => {
    try {
      const response = await axiosInstance.post("Auth", credentials);
      return response.data;
    } catch (error) {
      console.error("Login Error:", error);
      throw error;
    }
  },

  /**
   * Refresh Token - Gets a new access token using refresh token
   */
  refreshToken: async () => {
    const refreshToken = localStorage.getItem("refreshToken");
    if (!refreshToken) throw new Error("No refresh token available");

    const response = await axiosInstance.post("Auth/Refresh", { refreshToken });
    console.log("refreshToken", response);

    if (response.data.token) {
      localStorage.setItem("authToken", response.data.token);
      localStorage.setItem("refreshToken", response.data.refreshToken);
    }

    return response.data;
  },

  /**
   * Revoke Token - Logs out the user by invalidating refresh token
   */
  revokeToken: async () => {
    try {
      const token = localStorage.getItem("authToken");
      const refreshToken = localStorage.getItem("refreshToken");

      if (!token || !refreshToken) throw new Error("No tokens found");

      await axiosInstance.post("Auth/RevokeToken", { token, refreshToken });
    } finally {
      AuthService.logout(); // Ensure user is logged out
    }
  },

  /**
   * Register function - Creates a new user
   */
  register: async (userData) => {
    try {
      return await axiosInstance.post("Auth/Register", userData);
    } catch (error) {
      console.log("Registration Error:", error);
      throw error;
    }
  },

  /**
   * Forget Password - Sends reset password link
   */
  forgetPassword: async (forgotPasswordData) => {
    return await axiosInstance.post("Auth/forgetpassword", forgotPasswordData);
  },

  /**
   * Reset Password
   */
  resetPassword: async (resetPasswordData) => {
    return await axiosInstance.post("Auth/resstpassword", resetPasswordData);
  },

  /**
   * Logout function - Removes tokens and redirects to login
   */
  logout: () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("refreshToken");
    window.location.href = "/login"; // Redirect to login page
  },
};

export default AuthService;
