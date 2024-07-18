// vite.config.ts
import { defineConfig } from "file:///Users/zongyanjia/project/aig/node_modules/vite/dist/node/index.js";
import vue from "file:///Users/zongyanjia/project/aig/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import nightwatchPlugin from "file:///Users/zongyanjia/project/aig/node_modules/vite-plugin-nightwatch/index.js";
import vueDevTools from "file:///Users/zongyanjia/project/aig/node_modules/vite-plugin-vue-devtools/dist/vite.mjs";
import path from "node:path";
var __vite_injected_original_dirname = "/Users/zongyanjia/project/aig";
var vite_config_default = defineConfig({
  plugins: [
    vue(),
    nightwatchPlugin({
      renderPage: "./nightwatch/index.html"
    }),
    vueDevTools()
  ],
  resolve: {
    alias: {
      // '@': fileURLToPath(new URL('./src', import.meta.url))
      "@": path.resolve(__vite_injected_original_dirname, "./src")
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvVXNlcnMvem9uZ3lhbmppYS9wcm9qZWN0L2FpZ1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiL1VzZXJzL3pvbmd5YW5qaWEvcHJvamVjdC9haWcvdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL1VzZXJzL3pvbmd5YW5qaWEvcHJvamVjdC9haWcvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgeyBmaWxlVVJMVG9QYXRoLCBVUkwgfSBmcm9tICdub2RlOnVybCdcblxuaW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSdcbmltcG9ydCB2dWUgZnJvbSAnQHZpdGVqcy9wbHVnaW4tdnVlJ1xuaW1wb3J0IG5pZ2h0d2F0Y2hQbHVnaW4gZnJvbSAndml0ZS1wbHVnaW4tbmlnaHR3YXRjaCdcbmltcG9ydCB2dWVEZXZUb29scyBmcm9tICd2aXRlLXBsdWdpbi12dWUtZGV2dG9vbHMnXG5pbXBvcnQgcGF0aCBmcm9tICdub2RlOnBhdGgnXG5cbi8vIGh0dHBzOi8vdml0ZWpzLmRldi9jb25maWcvXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xuICBwbHVnaW5zOiBbXG4gICAgdnVlKCksXG4gICAgbmlnaHR3YXRjaFBsdWdpbih7XG4gICAgICByZW5kZXJQYWdlOiAnLi9uaWdodHdhdGNoL2luZGV4Lmh0bWwnXG4gICAgfSksXG4gICAgdnVlRGV2VG9vbHMoKSxcbiAgXSxcbiAgcmVzb2x2ZToge1xuICAgIGFsaWFzOiB7XG4gICAgICAvLyAnQCc6IGZpbGVVUkxUb1BhdGgobmV3IFVSTCgnLi9zcmMnLCBpbXBvcnQubWV0YS51cmwpKVxuICAgICAgJ0AnOiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCAnLi9zcmMnKVxuICAgIH1cbiAgfVxufSlcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFFQSxTQUFTLG9CQUFvQjtBQUM3QixPQUFPLFNBQVM7QUFDaEIsT0FBTyxzQkFBc0I7QUFDN0IsT0FBTyxpQkFBaUI7QUFDeEIsT0FBTyxVQUFVO0FBTmpCLElBQU0sbUNBQW1DO0FBU3pDLElBQU8sc0JBQVEsYUFBYTtBQUFBLEVBQzFCLFNBQVM7QUFBQSxJQUNQLElBQUk7QUFBQSxJQUNKLGlCQUFpQjtBQUFBLE1BQ2YsWUFBWTtBQUFBLElBQ2QsQ0FBQztBQUFBLElBQ0QsWUFBWTtBQUFBLEVBQ2Q7QUFBQSxFQUNBLFNBQVM7QUFBQSxJQUNQLE9BQU87QUFBQTtBQUFBLE1BRUwsS0FBSyxLQUFLLFFBQVEsa0NBQVcsT0FBTztBQUFBLElBQ3RDO0FBQUEsRUFDRjtBQUNGLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
