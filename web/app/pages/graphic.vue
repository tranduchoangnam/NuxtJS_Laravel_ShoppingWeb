<template>
  <div>
    <img class="w-full" :src="banner" />
    <ListProduct v-if="products" :data="products" />
  </div>
</template>
<script setup lang="ts">
import axios from "axios";
useHead({
  title: "BOO | Graphic",
});

const banner = "https://cdn.boo.vn/media/wysiwyg/web_1409.gif";
const products = ref(null);
onMounted(async () => {
  try {
    const response = await axios.get("/api/api/products/brand/graphic");
    // Handle the response data here
    products.value = response.data;
    // console.log(response.data);
  } catch (error) {
    // Handle errors here
    console.error("Request failed:", error);
  }
});
</script>
