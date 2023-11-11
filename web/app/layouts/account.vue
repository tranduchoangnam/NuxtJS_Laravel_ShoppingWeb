<template>
  <div>
    <Header />
    <div
      id="account-wrapper"
      class="mt-[5rem] px-4 py-12 flex justify-between border"
    >
      <div id="menu" class="w-[27rem] hidden lg:block mr-4 p-8 border-box">
        <NuxtLink
          v-for="(item, index) in menu"
          :key="index"
          :to="item.link"
          class="flex justify-between rounded-full py-1 px-4 mb-12 border-box text-[1.4rem]"
        >
          <p>{{ item.title }}</p>
          <v-icon class="">mdi-chevron-right</v-icon>
        </NuxtLink>
        <div class="h-[20rem] w-[10rem] mx-auto flex justify-center">
          <CardProduct v-if="products" :data="products[current]" />
        </div>
      </div>
      <div class="w-full p-8 border-box">
        <slot />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import axios from "axios";
const menu = [
  { title: "My Account", link: "/account" },
  { title: "Orders", link: "/orders" },
  { title: "Wishlist", link: "/wishlist" },
  { title: "Stores Map", link: "/stores" },
  { title: "Buy now", link: "/" },
];
const products: Ref<Array<Object> | null> = ref(null);
const current = ref(0);
onMounted(async () => {
  try {
    const response = await axios.get("/api/api/products");
    // Handle the response data here
    products.value = response.data;
    // console.log(response.data);
  } catch (error) {
    // Handle errors here
    console.error("Request failed:", error);
  }
  console.log("hi");
  if (products.value) {
    setInterval(() => {
      current.value += 1;
      current.value >= products.value!.length
        ? (current.value = current.value - products.value!.length)
        : current.value;
    }, 8000);
  }
});
</script>
<style scoped>
.border-box {
  border: 0.07rem solid #000000;
}
@media screen and (min-width: 1280px) {
  #account-wrapper {
    padding-left: 4rem !important;
    padding-right: 4rem !important;
  }
  #account-wrapper #menu {
    margin-right: 2rem !important;
  }
}
</style>
