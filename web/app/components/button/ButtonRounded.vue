<template>
  <div
    class="w-full py-2 rounded-full text-white cursor-pointer"
    :style="{ backgroundColor: bgColor, color: textColor }"
  >
    <div class="flex justify-center items-center font-bold">
      <slot name="name"></slot>
    </div>
  </div>
</template>
<script setup lang="ts">
defineProps({
  bgColor: {
    type: String,
    required: true,
  },
  textColor: {
    type: String,
    required: true,
  },
});
</script>
