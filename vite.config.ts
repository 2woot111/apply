import react from "@vitejs/plugin-react";
import tailwind from "tailwindcss";
import { defineConfig } from "vite";
import { loadEnv } from "vite";

// https://vite.dev/config/
const env = loadEnv("development", process.cwd(), "");
export default defineConfig({
  plugins: [react()],
  base: "./",
  css: {
    postcss: {
      plugins: [tailwind()],
    },
  },
  define: {
    __APP_ENV__: JSON.stringify(env.APP_ENV),
  },
});
