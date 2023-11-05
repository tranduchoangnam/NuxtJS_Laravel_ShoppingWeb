import axios from "~/libs/axios";
import { defineNuxtPlugin } from "#app";

export default defineNuxtPlugin((nuxtApp) => {
  axios.defaults.baseURL =
    nuxtApp.vueApp.config.globalProperties.$config.public.apiBaseUrl;
  if (process.server) {
    axios.defaults.baseURL = nuxtApp.ssrContext?.runtimeConfig.apiHost;
  }
});
