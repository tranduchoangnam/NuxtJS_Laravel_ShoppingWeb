import path from "path";

import favicon from "./nuxt/favicon";
import fonts from "./nuxt/fonts";
import head from "./nuxt/head";

export default defineNuxtConfig({
  srcDir: path.resolve(__dirname, "app"),

  app: {
    head: {
      title: "Exchange Shop",
      titleTemplate: "%s - Exchange Shop",
      meta: [...head.meta],
      link: [...fonts.link, ...favicon.link],
      script: [...head.script],
    },
  },

  css: [
    "~/assets/scss/index.scss",
    "vuetify/lib/styles/main.sass",
    "@mdi/font/css/materialdesignicons.min.css",
  ],

  build: {
    transpile: ["vuetify"],
  },

  runtimeConfig: {
    sentryDsn: "",
    appEnv: "",
    apiHost: "",
    public: {
      appUrl: process.env.NUXT_PUBLIC_APP_URL ?? "",
      ssoHost: process.env.NUXT_PUBLIC_SSO_HOST ?? "",
      apiBaseUrl: "/api",
      analyticsTrackId: "",
      ssoImagesUrl: process.env.NUXT_PUBLIC_SSO_IMAGES_URL ?? "",
      ssoNonceCookie:
        process.env.NUXT_PUBLIC_SSO_NONCE_COOKIE ?? "viblo_session_nonce",
    },
  },

  devServer: {
    host: "0.0.0.0",
    port: 3000,
  },

  vite: {
    define: {
      "process.env.DEBUG": "false",
    },
  },

  modules: [
    [
      "@pinia/nuxt",
      {
        autoImports: ["defineStore", "acceptHMRUpdate"],
      },
    ],
    "@nuxtjs/tailwindcss",
    "@nuxtjs/google-fonts",
  ],

  components: [
    {
      path: "~/components", // will get any components nested in let's say /components/test too
      pathPrefix: false,
    },
  ],
});
