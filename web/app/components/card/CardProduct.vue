<template>
  <div class="w-full aspect-[1/2]">
    <NuxtLink :to="'/product/' + data.id" class="h-full w-full">
      <div class="h-[75%] overflow-hidden">
        <img
          class="object-cover h-full"
          :src="data.image[currentColor]"
          @mouseover="next(data.image.length - 1)"
          @mouseleave="back(data.image.length - 1)"
        />
      </div>
    </NuxtLink>

    <div class="h-[25%] flex flex-col items-center justify-between pt-4">
      <div class="text-center h-[51%]">
        {{ data.name }}
      </div>
      <div class="font-bold">{{ convertStr(data.price) }}</div>
      <div class="flex justify-center h-[20%]">
        <ButtonColor
          v-for="(color, index) in data.color"
          :key="index"
          :color="color"
          @click="currentColor = index"
          :class="currentColor === index ? 'border-[0.2rem]' : ''"
        />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { convertStr } from "~/utils/convert";

const currentColor = ref(0);
const next = (max: number) => {
  if (currentColor.value === max) {
    currentColor.value = 0;
  } else {
    currentColor.value++;
  }
};
const back = (max: number) => {
  if (currentColor.value === 0) {
    currentColor.value = max;
  } else {
    currentColor.value--;
  }
};

defineProps({
  data: {
    type: Object,
    required: true,
  },
});
</script>
<style scoped>
.gridd {
  display: grid;
  grid-template-rows: 7fr 2fr;
}
</style>
