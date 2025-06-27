import { defineConfig } from "cypress";

export default defineConfig({
  projectId: "ubulu_frontend_task",
  viewportWidth: 1480,
  viewportHeight: 1260,
  video: false,
  videosFolder: "cypress/videos",
  screenshotsFolder: "cypress/screenshots",
  pageLoadTimeout: 60000,
  requestTimeout: 45000,
  responseTimeout: 45000,
  experimentalStudio: true,
  e2e: {
    setupNodeEvents() {},
    baseUrl: "http://localhost:5173",
    specPattern: "cypress/e2e/**/*.{js,jsx,ts,tsx}",
  },
});
