<template>
  <div class="flex justify-center mb-16">
    <div class="border-2 text-[2rem] px-4 rounded-xl bg-white">{{ name }}</div>
  </div>
</template>
<script setup lang="ts">
defineProps({
  name: {
    type: String,
    required: true,
  },
});
</script>
