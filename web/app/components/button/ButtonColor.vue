<template>
  <div
    class="w-[10%] aspect-square ma-2 bg-white border-black border-[0.05rem] p-[0.15rem] cursor-pointer"
  >
    <div class="w-full h-full" :style="{ backgroundColor: color }"></div>
  </div>
</template>
<script setup lang="ts">
defineProps({
  color: String,
});
</script>
