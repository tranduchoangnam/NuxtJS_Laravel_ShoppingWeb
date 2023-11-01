<template>
  <div class="grid grid-cols-8 mb-16">
    <SlideProduct class="col-span-7" v-if="type === 1" :data="data" />
    <div class="text-[2rem]" :class="type === 1 ? 'mr-[4rem]' : 'ml-[4rem]'">
      <div
        class="border-b-4"
        :class="type === 0 ? 'border-[#D9D827]' : 'border-[#BC2A27]'"
      >
        {{ title }}
      </div>
    </div>
    <SlideProduct
      class="col-start-2 col-span-7"
      v-if="type === 0"
      :data="data"
    />
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
