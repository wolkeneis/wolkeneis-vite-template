import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { dependencies } from "./package.json";


function renderChunks(dependencies: Record<string, string>) {
  let chunks: {
    [key: string]: any;
  } = {};
  Object.keys(dependencies).forEach((key) => {
    if (["react", "react-dom"].includes(key)) return;
    chunks[key] = [key];
  });
  return chunks;
}

export default defineConfig({
  base: process.env.ELECTRON == "true" ? "./" : "",
  server: {
    port: 3000
  },
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ["react", "react-dom"],
          ...renderChunks(dependencies)
        }
      }
    }
  }
});
