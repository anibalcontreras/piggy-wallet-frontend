import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:8081',
    viewportWidth: 393,
    viewportHeight: 852,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
