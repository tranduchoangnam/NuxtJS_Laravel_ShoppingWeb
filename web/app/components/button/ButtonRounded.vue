<template>
  <div
    class="w-full py-2 rounded-full cursor-pointer"
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
    required: false,
    default: "#ffffff",
  },
  textColor: {
    type: String,
    required: false,
    default: "#000000",
  },
});
</script>
