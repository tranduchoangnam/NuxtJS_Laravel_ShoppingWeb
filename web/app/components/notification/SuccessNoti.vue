<template>
  <div
    class="fixed top-0 left-0 w-full mt-[5rem] text-[1rem] py-2 flex justify-center text-green-500 bg-[#E5F9E5]"
  >
    <v-icon>mdi-check-circle</v-icon>
    {{ message }}
  </div>
</template>
<script setup lang="ts">
defineProps({
  message: String,
});
</script>
