import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    allowedHosts: [".labs.play-with-docker.com"], // ✅ Allow Play-With-Docker
  },
});
