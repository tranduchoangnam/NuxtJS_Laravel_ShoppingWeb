<template>
  <div
    class="fixed top-0 left-0 w-full mt-[5rem] text-[1rem] py-2 flex justify-center bg-[#F9E5E5] text-red-500"
  >
    <v-icon>mdi-alert-circle</v-icon>
    {{ message }}
  </div>
</template>
<script setup lang="ts">
defineProps({
  message: String,
});
</script>
