import { jsxLocPlugin } from "@builder.io/vite-plugin-jsx-loc";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import fs from "node:fs";
import path from "path";
import { defineConfig } from "vite";
import { vitePluginManusRuntime } from "vite-plugin-manus-runtime";


const plugins = [react(), tailwindcss(), jsxLocPlugin(), vitePluginManusRuntime()];

export default defineConfig({
  plugins,
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "client", "src"),
      "@shared": path.resolve(import.meta.dirname, "shared"),
      "@assets": path.resolve(import.meta.dirname, "attached_assets"),
    },
  },
  envDir: path.resolve(import.meta.dirname),
  root: path.resolve(import.meta.dirname, "client"),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true,
    target: "es2020",
    minify: "esbuild",
    sourcemap: false,
    cssCodeSplit: true,
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          // Core React - CRITICAL for initial load
          if (id.includes('node_modules/react/') || id.includes('node_modules/react-dom/')) return 'react';
          if (id.includes('node_modules/scheduler')) return 'react';
          
          // Router - needed for navigation
          if (id.includes('node_modules/wouter')) return 'router';
          
          // Query client - needed for data fetching
          if (id.includes('node_modules/@tanstack/react-query')) return 'query';
          
          // Web3 (lazy loaded - NOT in home bundle)
          if (id.includes('node_modules/wagmi')) return 'web3-wagmi';
          if (id.includes('node_modules/viem')) return 'web3-viem';
          if (id.includes('node_modules/@wagmi')) return 'web3-wagmi';
          if (id.includes('node_modules/ethers')) return 'web3-ethers';
          if (id.includes('node_modules/@web3-react')) return 'web3-react';
          if (id.includes('node_modules/web3')) return 'web3';
          
          // UI Components - split for better caching
          if (id.includes('node_modules/@radix-ui')) return 'ui-radix';
          if (id.includes('node_modules/lucide-react')) return 'ui-icons';
          
          // Animations (lazy loaded - NOT in home bundle)
          if (id.includes('node_modules/framer-motion')) return 'animation-framer';
          
          // PDF (lazy loaded - NOT in home bundle)
          if (id.includes('node_modules/html2pdf')) return 'pdf-html2pdf';
          if (id.includes('node_modules/html2canvas')) return 'pdf-canvas';
          if (id.includes('node_modules/jspdf')) return 'pdf-jspdf';
          if (id.includes('node_modules/pdfjs-dist')) return 'pdf-pdfjs';
          
          // Charts (lazy loaded - NOT in home bundle)
          if (id.includes('node_modules/recharts')) return 'charts-recharts';
          if (id.includes('node_modules/d3-')) return 'charts-d3';
          if (id.includes('node_modules/chart.js')) return 'charts-chartjs';
          
          // Utilities
          if (id.includes('node_modules/date-fns')) return 'utils-date';
          if (id.includes('node_modules/clsx')) return 'utils-clsx';
          
          // Other vendor code - split to avoid monolithic bundle
          if (id.includes('node_modules/')) {
            if (id.includes('node_modules/axios') || id.includes('node_modules/ky')) return 'vendor-http';
            if (id.includes('node_modules/zod')) return 'vendor-validation';
            return 'vendor';
          }
        },
        assetFileNames: (assetInfo) => {
          const info = assetInfo.name.split('.');
          const ext = info[info.length - 1];
          if (/png|jpe?g|svg|gif|tiff|bmp|ico|avif|webp/i.test(ext)) {
            return `assets/images/[name]-[hash][extname]`;
          }
          return `assets/[name]-[hash][extname]`;
        },
      },
    },
    chunkSizeWarningLimit: 1000,
    reportCompressedSize: false,
  },
  server: {
    port: 3000,
    strictPort: false,
    host: true,
    allowedHosts: [
      ".manuspre.computer",
      ".manus.computer",
      ".manus-asia.computer",
      ".manuscomputer.ai",
      ".manusvm.computer",
      "localhost",
      "127.0.0.1",
    ],
    fs: {
      strict: false,
    },
    headers: {
      'Cache-Control': 'public, max-age=31536000',
      'X-Content-Type-Options': 'nosniff',
      'X-Frame-Options': 'SAMEORIGIN',
      'X-XSS-Protection': '1; mode=block',
    },
  },
  preview: {
    headers: {
      'Cache-Control': 'public, max-age=31536000',
      'X-Content-Type-Options': 'nosniff',
      'X-Frame-Options': 'SAMEORIGIN',
      'X-XSS-Protection': '1; mode=block',
    },
  },
});
