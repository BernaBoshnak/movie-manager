import { defineConfig } from 'cypress'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

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
        resolve: {
          alias: {
            '@components': path.resolve(__dirname, 'src/components'),
            '@context': path.resolve(__dirname, 'src/context'),
            '@controllers': path.resolve(__dirname, 'src/controllers'),
            '@custom-types': path.resolve(__dirname, 'src/types'),
            '@styles': path.resolve(__dirname, 'src/assets/scss'),
            '@utils': path.resolve(__dirname, 'src/utils'),
          },
          extensions: ['.tsx', '.ts', '.js', '.jsx', '.json', '.scss'],
        },
      },
    },
  },
})
