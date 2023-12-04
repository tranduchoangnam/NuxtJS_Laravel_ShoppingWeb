<template>
  <div class="fixed !z-[1000] top-0 left-0 w-full bg-white text-[1.15rem]">
    <div class="flex px-16 items-center justify-between border-b-2 h-[5rem]">
      <NuxtLink to="/"
        ><img src="https://cdn.boo.vn/media/logo/stores/1/logo.png" />
      </NuxtLink>
      <div class="hidden lg:flex items-center">
        <!-- <div class="border px-2 rounded-md bg-blue-700 text-white">Graphic</div> -->
        <NuxtLink
          v-for="(nav, index) in listNav"
          :to="nav.link"
          :key="index"
          :name="nav.title"
          class="h-[4rem] px-6 flex items-center cursor-pointer hover:font-black"
          @mouseover="
            hoverNav = nav.title;
            lastNav = nav.title;
          "
          @mouseleave="delayMouse"
        >
          <HeaderNav
            :name="nav.title"
            :class="index === 0 ? 'graphic' : index === 5 ? 'text-red-500' : ''"
          />
        </NuxtLink>
      </div>
      <div class="flex text-[1.5rem]">
        <v-icon @click="next">mdi-magnify</v-icon>
        <v-icon
          @click="
            if (auth.token) navigateTo('/wishlist');
            else navigateTo('/auth/signin');
          "
          class="ml-4"
          >mdi-heart-outline</v-icon
        >
        <div class="relative">
          <v-icon @click="toggleCart = !toggleCart" class="ml-4"
            >mdi-cart-outline</v-icon
          >
          <div
            v-if="totalProduct"
            class="absolute top-0 right-0 rounded-full w-[1rem] h-[1rem] flex justify-center items-center bg-red-600"
          >
            <p class="text-white text-[0.7rem]">{{ totalProduct }}</p>
          </div>
        </div>
        <NuxtLink v-if="!auth.token" to="/auth/signin"
          ><v-icon class="ml-4">mdi-account-outline</v-icon></NuxtLink
        >
        <div class="relative" v-else>
          <v-icon @click="toggleUserMenu = !toggleUserMenu" class="ml-4"
            >mdi-account-outline</v-icon
          >
          <UserMenu v-if="toggleUserMenu" />
        </div>
      </div>
    </div>
    <HeaderMenu
      class="absolute top-[5rem] left-0 w-full"
      v-if="lastNav"
      :nav="showIndex(lastNav)"
      @mouseover="hoverNav = lastNav"
      @mouseleave="
        hoverNav = '';
        delayMouse();
      "
    />
    <CardCart v-if="toggleCart" @response="() => (toggleCart = !toggleCart)" />
  </div>
</template>
<script setup lang="ts">
import UserMenu from "./UserMenu.vue";
import { useAuthStore } from "~/store/auth";
import { useCartStore } from "@/store/cart";
const cart = useCartStore();
const totalProduct = ref(0);
watch(
  () => cart.total,
  (value) => {
    totalProduct.value = value;
  }
);

const toggleUserMenu = ref(false);
const toggleCart = ref(false);
const auth = useAuthStore();
const lastNav = ref("");
const hoverNav = ref("");
const listNav = [
  { title: "GRAPHIC", link: "/graphic" },
  { title: "WOMEN", link: "/" },
  { title: "MAN", link: "/" },
  { title: "NEW ARRIVAL", link: "/" },
  { title: "COLLECTION", link: "/" },
  { title: "DISCOUNT", link: "/" },
];
const showIndex = (item: string) => {
  const index = listNav.findIndex((navItem) => navItem.title === item);
  return index;
};
const delayMouse = () => {
  setTimeout(() => {
    if (!hoverNav.value) {
      lastNav.value = "";
    }
  }, 10);
};
onMounted(() => {
  cart.getCart();
});
const next = () => {};
</script>
<style scoped>
.graphic {
  padding-left: 0.5rem;
  padding-right: 0.5rem;
  border-radius: 0.375rem;
  background-color: #251afc;
  color: white;
}
</style>
