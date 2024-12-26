import { defineConfig } from 'cypress'

export default defineConfig({
  projectId: 'fyjp1s',
  e2e: {
    baseUrl: 'http://localhost:3000',
    specPattern: 'tests/e2e/**/*.test.cy.ts',
    supportFile: false,
  },
})
