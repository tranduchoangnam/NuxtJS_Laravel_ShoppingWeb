<template>
  <div
    class="aspect-[1/1] mx-1 bg-white border-black border-[0.05rem] p-[0.15rem] cursor-pointer"
  >
    <div class="w-full h-full" :style="{ backgroundColor: color }"></div>
  </div>
</template>
<script setup lang="ts">
defineProps({
  color: String,
});
</script>
