import DataHandler from 'ioredis/built/DataHandler';
<template>
  <v-card flat color="var(--color-background)">
    <v-img
      :src="data.image[currentColor]"
      @mouseover="next(data.image.length - 1)"
      @mouseleave="back(data.image.length - 1)"
    />
    <div class="flex mt-4 flex-col items-center">
      <div class="h-[3rem] overflow-hidden">{{ data.name }}</div>
      <div class="font-bold">{{ convertStr(data.price) }}</div>
    </div>
    <div class="flex mt-4 justify-center">
      <ButtonColor
        v-for="(color, index) in data.color"
        :color="color"
        @click="currentColor = index"
        :class="currentColor === index ? 'border-4' : ''"
      />
    </div>
  </v-card>
</template>
<script setup lang="ts">
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
const convertStr = (e: number) => {
  let temp = e;
  let str = "";
  let count = 0;
  while (temp > 0) {
    str = (temp % 10) + str;
    count++;
    if (count % 3 === 0 && temp >= 10) {
      str = "." + str;
    }
    temp = Math.floor(temp / 10);
  }
  return str + " đ";
};
defineProps({
  data: {
    type: Object,
    required: true,
  },
});
</script>
