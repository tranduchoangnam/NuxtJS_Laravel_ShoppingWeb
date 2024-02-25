import { useAuthStore } from "~/store/auth";
export default defineNuxtPlugin(async (nuxtApp) => {
  const user = useAuthStore(nuxtApp.vueApp.$nuxt.$pinia);
  await useAsyncData("user", () => user.get());
});
