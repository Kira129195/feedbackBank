import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  tanstackStart: {
    allowedHosts: ["feedbackbankitaly.onrender.com", "localhost"]
  },
  server: {
    allowedHosts: ["feedbackbankitaly.onrender.com", "localhost"]
  }
} as any);