<template>
  <div class="flex flex-col mx-16 label-hover">
    <div class="font-bold">{{ title }}</div>
    <div v-for="(item, index) in list" :key="index" @click="next(item.link)">
      {{ item.name }}
    </div>
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
  list: {
    type: Array as PropType<Item[]>,
    required: true,
  },
});
const next = (link: string) => {
  console.log(link);
};
</script>
<style scoped>
.label-hover > div:hover {
  color: red;
  cursor: pointer;
}
</style>
