<template>
  <div class="w-8 h-8 ma-2 bg-white border-black border-[0.05rem] p-[0.15rem]">
    <div class="w-full h-full" :style="{ backgroundColor: color }"></div>
  </div>
</template>
<script setup lang="ts">
defineProps({
  color: String,
});
</script>
