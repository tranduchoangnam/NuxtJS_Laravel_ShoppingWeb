<template>
  <div class="w-full">
    <div class="flex mb-16 w-full px-[4rem]">
      <SlideProduct class="w-[81%]" v-if="type === 1" :data="data" />
      <div class="text-[2rem] w-[19%]">
        <div
          class="border-b-4"
          :class="type === 0 ? 'border-[#D9D827]' : 'border-[#BC2A27]'"
        >
          {{ title }}
        </div>
      </div>
      <SlideProduct class="w-[80%]" v-if="type === 0" :data="data" />
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
  data: {
    type: Array<Object>,
    required: true,
  },
});
</script>
