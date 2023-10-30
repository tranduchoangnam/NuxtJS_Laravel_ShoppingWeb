<template>
  <div class="flex mb-16" v-if="type === 0">
    <div class="text-[2rem] w-[20rem] ml-[4rem]">
      <div class="border-b-4 border-[#D9D827]">{{ title }}</div>
    </div>
    <SlideProduct />
  </div>
  <div class="flex mb-16" v-if="type === 1">
    <SlideProduct />
    <div class="text-[2rem] w-[20rem] mr-[4rem]">
      <div class="border-b-4 border-[#BC2A27]">{{ title }}</div>
    </div>
  </div>
</template>
<script setup lang="ts">
defineProps({
  title: {
    type: String,
    required: true,
  },
  type: {
    type: Number,
    required: true,
  },
});
</script>
