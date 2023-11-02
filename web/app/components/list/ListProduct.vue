import { CardProduct } from '#build/components';
<template>
  <div
    class="grid lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3 grid-cols-2 grid-flow-row gap-x-6 gap-y-8 my-16 mx-8"
  >
    <div v-for="(product, index) in data">
      <CardProduct :key="index" :data="product" />
    </div>
  </div>
</template>
<script setup lang="ts">
defineProps({
  data: {
    type: Array,
    required: true,
  },
});
</script>
