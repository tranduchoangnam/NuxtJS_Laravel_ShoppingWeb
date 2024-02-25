<template>
  <div>
    <img
      v-for="(banner, index) in banners"
      :key="index"
      :src="banner"
      class="w-full"
    />
    <ListProduct v-if="collection" :data="collection" />
  </div>
</template>
<script setup lang="ts">
import axios from "axios";
useHead({
  title: "BOO | Flex to school",
});
const banners = [
  "https://cdn.boo.vn/media/wysiwyg/landing_page_1.jpg",
  "https://boo.vn/media/wysiwyg/landing_page_2.jpg",
];
const collection = ref(null);
onMounted(async () => {
  try {
    const response = await axios.get(
      "/api/api/products/collection/hnbxboolaab"
    );
    // Handle the response data here
    collection.value = response.data;
    // console.log(response.data);
  } catch (error) {
    // Handle errors here
    console.error("Request failed:", error);
  }
});
</script>
