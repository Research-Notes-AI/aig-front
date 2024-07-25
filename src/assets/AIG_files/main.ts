import "/src/assets/main.css";
import { createApp } from "/node_modules/.vite/deps/vue.js?v=b6ad0bca";
import { createPinia } from "/node_modules/.vite/deps/pinia.js?v=b6ad0bca";
import App from "/src/App.vue";
import Toast from "/node_modules/.vite/deps/vue-toastification.js?v=b6ad0bca";
import "/node_modules/vue-toastification/dist/index.css";
import router from "/src/router/index.ts?t=1721727897344";
const app = createApp(App);
app.use(Toast, {
  // 在这里设置默认选项
});
app.use(createPinia());
app.use(router);
app.mount("#app");

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1haW4udHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICcuL2Fzc2V0cy9tYWluLmNzcydcblxuaW1wb3J0IHsgY3JlYXRlQXBwIH0gZnJvbSAndnVlJ1xuaW1wb3J0IHsgY3JlYXRlUGluaWEgfSBmcm9tICdwaW5pYSdcbi8vIGltcG9ydCBzdG9yZSBmcm9tICcuL3N0b3JlJztcblxuaW1wb3J0IEFwcCBmcm9tICcuL0FwcC52dWUnXG5pbXBvcnQgVG9hc3QgZnJvbSAndnVlLXRvYXN0aWZpY2F0aW9uJ1xuaW1wb3J0ICd2dWUtdG9hc3RpZmljYXRpb24vZGlzdC9pbmRleC5jc3MnXG5pbXBvcnQgcm91dGVyIGZyb20gJy4vcm91dGVyJ1xuXG5jb25zdCBhcHAgPSBjcmVhdGVBcHAoQXBwKVxuLy8gYXBwLnVzZShzdG9yZSk7XG5cbmFwcC51c2UoVG9hc3QsIHsvLyDlnKjov5nph4zorr7nva7pu5jorqTpgInpoblcbn0pO1xuYXBwLnVzZShjcmVhdGVQaW5pYSgpKVxuYXBwLnVzZShyb3V0ZXIpXG5cbmFwcC5tb3VudCgnI2FwcCcpXG4iXSwibWFwcGluZ3MiOiJBQUFBLE9BQU87QUFFUCxTQUFTLGlCQUFpQjtBQUMxQixTQUFTLG1CQUFtQjtBQUc1QixPQUFPLFNBQVM7QUFDaEIsT0FBTyxXQUFXO0FBQ2xCLE9BQU87QUFDUCxPQUFPLFlBQVk7QUFFbkIsTUFBTSxNQUFNLFVBQVUsR0FBRztBQUd6QixJQUFJLElBQUksT0FBTztBQUFBO0FBQ2YsQ0FBQztBQUNELElBQUksSUFBSSxZQUFZLENBQUM7QUFDckIsSUFBSSxJQUFJLE1BQU07QUFFZCxJQUFJLE1BQU0sTUFBTTsiLCJuYW1lcyI6W119