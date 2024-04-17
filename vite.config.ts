import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { ViteMinifyPlugin } from "vite-plugin-minify";

export default defineConfig({
  base: "./",
  resolve: {
    alias: {
      // Components: path.resolve(__dirname, "./src/components"),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          react: ["react", "react-dom"],
        },
      },
    },
  },

  plugins: [react(), ViteMinifyPlugin({})],
});
