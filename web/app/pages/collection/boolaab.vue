<template>
  <div>
    <img
      v-if="banners[0]"
      v-for="(banner, index) in banners"
      :key="index"
      :src="banner"
      class="w-full"
    />
    <div v-else class="w-full h-[0.01rem]"></div>
    <ListProduct v-if="collection" :data="collection" />
  </div>
</template>
<script setup lang="ts">
import axios from "axios";
useHead({
  title: "BOO | Flex to school",
});
const banners = ref<string[]>([]);
const collection = ref(null);
onMounted(async () => {
  try {
    const response = await axios.get("/api/api/products/collection/boolaab");
    // Handle the response data here
    collection.value = response.data;
    // console.log(response.data);
  } catch (error) {
    // Handle errors here
    console.error("Request failed:", error);
  }
});
</script>
