<template>
  <div class="w-full">
    <div class="text-[2rem] mb-4 pb-4 border-b-[1px] border-[#000000]">
      WISHLIST
    </div>
  </div>
  <ListProduct class="no-margin" :data="wish.list" />
</template>
<script setup lang="ts">
import { useWishlistStore } from "~/store/wishlist";
useHead({
  title: "BOO | Wishlist",
});
definePageMeta({
  layout: "account",
  middleware: "auth",
});

const wish = useWishlistStore();

onMounted(async () => {
  wish.getWishlist();
});
</script>
<style scoped>
.no-margin {
  margin: 0 !important;
}
</style>
