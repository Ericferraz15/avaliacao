import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({
      jsxRuntime: "automatic", // Alterado para "automatic" para compatibilidade com React 18
    }),
  ],
  server: {
    port: 5173,
    host: true,
    open: false,
    hmr: {
      overlay: false, // Desativa o overlay de erros se estiver causando problemas
    },
    watch: {
      usePolling: false,
      ignored: ["**/node_modules/**"],
    },
    proxy: {},
    cors: true,
  },
  build: {
    outDir: "dist",
    sourcemap: false,
    minify: "esbuild",
    rollupOptions: {
      output: {
        chunkFileNames: "assets/js/[name]-[hash].js",
        entryFileNames: "assets/js/[name]-[hash].js",
        assetFileNames: "assets/[ext]/[name]-[hash].[ext]",
        manualChunks: {
          react: ["react", "react-dom"],
          router: ["react-router-dom"],
        },
      },
    },
    assetsInlineLimit: 4096,
    cssCodeSplit: true,
    target: "esnext",
    chunkSizeWarningLimit: 1600,
  },
  optimizeDeps: {
    include: ["react", "react-dom", "react-router-dom", "react/jsx-runtime"],
    exclude: [],
    esbuildOptions: {
      loader: {
        ".js": "jsx",
      },
    },
  },
  define: {
    "process.env": process.env,
    __APP_ENV__: JSON.stringify(process.env.NODE_ENV || "development"),
  },
  resolve: {
    alias: {
      "@": "/src",
      "@components": "/src/components",
      "@pages": "/src/pages",
    },
  },
  css: {
    postcss: "./postcss.config.js",
    modules: {
      localsConvention: "camelCase",
    },
  },
});
