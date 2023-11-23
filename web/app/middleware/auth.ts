import { useAuthStore } from "~/store/auth";
export default defineNuxtRouteMiddleware(async (to, from) => {
  if (isAuthenticated() === false) {
    return navigateTo("/auth/signin");
  }
});
const isAuthenticated = () => {
  const auth = useAuthStore();
  try {
    auth.get();
    return true;
  } catch (error) {
    return false;
  }
};
