<template>
  <div class="flex flex-col mx-16 label-hover">
    <NuxtLink :to="link" class="font-bold">
      {{ title }}
    </NuxtLink>
    <NuxtLink v-for="(item, index) in list" :key="index" :to="item.link">
      {{ item.name }}
    </NuxtLink>
  </div>
</template>
<script setup lang="ts">
import { PropType } from "vue";
interface Item {
  name: string;
  link: string;
}
defineProps({
  title: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: true,
  },
  list: {
    type: Array as PropType<Item[]>,
    required: true,
  },
});
</script>
<style scoped>
.label-hover > :hover {
  color: red;
  cursor: pointer;
}
</style>
