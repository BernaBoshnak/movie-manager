import { defineConfig } from 'cypress'

export default defineConfig({
  video: false,
  component: {
    specPattern: './tests/**/*.cy.{ts,tsx}',
    devServer: {
      framework: 'react',
      bundler: 'vite',
      viteConfig: {
        mode: 'test',
        devtool: false,
      },
    },
  },
})
