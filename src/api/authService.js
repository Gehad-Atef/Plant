import axiosClient from "./client";

/**
 * Authentication Service
 */
const AuthService = {
  /**
   * Login function - Authenticates a user and stores tokens
   */
  login: async (credentials) => {
    try {
      const response = await axiosClient.post("Auth", credentials);
      return response.data;
    } catch (error) {
      console.error("Login Error:", error);
      throw error;
    }
  },

  /**
   * Register function - Creates a new user
   */
  register: async (userData) => {
    try {
      return await axiosClient.post("Auth/Register", userData);
    } catch (error) {
      console.log("Registration Error:", error);
      throw error;
    }
  },

  /**
   * Logout function - Removes tokens and redirects to login
   */
  logout: () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("refreshToken");
    window.location.href = "/login"; // Redirect to login page
  },

  // Fetch user profile
  getProfile: async () => {
    try {
      const response = await axiosClient.get("me");
      console.log("getProfile response", response);
      return response.data;
    } catch (error) {
      console.error("Get Profile Error:", error);
      throw error;
    }
  },

  // Update profile (with image)
  updateProfile: async (formData) => {
    try {
      const response = await axiosClient.put("me/info", formData, {
        headers: { "Content-Type": "multipart/form-data" }, // Required for file upload
      });
      return response.data;
    } catch (error) {
      console.error("Update Profile Error:", error);
      throw error;
    }
  },

  // Change password
  changePassword: async (passwordData) => {
    try {
      const response = await axiosClient.put(
        "me/change-Password",
        passwordData
      );
      return response.data;
    } catch (error) {
      console.error("Change Password Error:", error);
      throw error;
    }
  },
};

export default AuthService;
