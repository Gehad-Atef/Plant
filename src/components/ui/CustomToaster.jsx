import { Toaster } from "react-hot-toast";

const CustomToaster = () => {
  return (
    <Toaster
      position="bottom-left"
      reverseOrder={false} // Newest at the top
      toastOptions={{
        // ✅ Default Style (Light/Dark Mode)
        className:
          "!bg-white dark:!bg-gray-800 !text-gray-900 dark:!text-white shadow-md",
        duration: 4000,
        style: {
          borderRadius: "8px",
          padding: "12px 16px",
          boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.1)",
        },

        // ✅ Success Notification Style ✅
        success: {
          iconTheme: {
            primary: "#22c55e", // Green accent
            secondary: "#ffffff",
          },
          className: "!border-l-4 !border-green-600",
          style: {
            background: "#ecfdf5",
            color: "#065f46",
            borderLeft: "4px solid #22c55e",
          },
        },

        // ❌ Error Notification Style ❌
        error: {
          iconTheme: {
            primary: "#ef4444", // Red accent
            secondary: "#ffffff",
          },
          className: "!border-l-4 !border-red-600",
          style: {
            background: "#fef2f2",
            color: "#991b1b",
            borderLeft: "4px solid #ef4444",
          },
        },

        // ⚠️ Warning Notification Style ⚠️
        warning: {
          iconTheme: {
            primary: "#facc15", // Yellow accent
            secondary: "#ffffff",
          },
          className: "!border-l-4 !border-yellow-600",
          style: {
            background: "#fef9c3",
            color: "#92400e",
            borderLeft: "4px solid #facc15",
          },
        },

        // 🔔 Info Notification Style 🔔
        info: {
          iconTheme: {
            primary: "#3b82f6", // Blue accent
            secondary: "#ffffff",
          },
          className: "!border-l-4 !border-blue-600",
          style: {
            background: "#eff6ff",
            color: "#1e40af",
            borderLeft: "4px solid #3b82f6",
          },
        },
      }}
    />
  );
};

export default CustomToaster;
