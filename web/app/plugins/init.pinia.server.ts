import { useAuthStore } from "~/store/auth";
import { useCartStore } from "~/store/cart";
export default defineNuxtPlugin(async (nuxtApp) => {
  const user = useAuthStore(nuxtApp.vueApp.$nuxt.$pinia);
  const cart = useCartStore(nuxtApp.vueApp.$nuxt.$pinia);
  await useAsyncData("user", () => user.get());
  if (process.client) {
    cart.getCart();
    console.log("cart", cart.list);
  }
});
