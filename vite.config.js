import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  // server: {
  //   hmr: {
  //     overlay: false, // ✅ تعطيل التحديث التلقائي في الواجهة
  //   },
  //   watch: {
  //     usePolling: false, // ✅ منع التحديث العشوائي للملفات
  //   },
  // },
});
