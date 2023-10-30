<template>
  <div class="flex justify-between mx-4">
    <div class="w-[20rem]" v-for="index in 4" :key="index">
      <img :src="brand[index - 1]" />
    </div>
  </div>
</template>
<script setup lang="ts">
const brand = ref([
  "https://cdn.boo.vn/media/wysiwyg/1200x1800px-2_2.png",
  "https://cdn.boo.vn/media/wysiwyg/1200x1800px-3_3.png",
  "https://cdn.boo.vn/media/wysiwyg/1200x1800px-4.png",
  "https://cdn.boo.vn/media/wysiwyg/1200x1800px-1_1.png",
]);
</script>
