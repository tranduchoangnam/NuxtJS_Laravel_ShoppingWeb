<template>
  <div class="grid grid-rows-4 h-full">
    <div class="row-span-3 border">
      <img
        class="object-cover h-full"
        :src="data.image[currentColor]"
        @mouseover="next(data.image.length - 1)"
        @mouseleave="back(data.image.length - 1)"
      />
    </div>
    <div class="row-span-1 flex flex-col items-center justify-between pt-4">
      <div class="text-center h-[51%] overflow-hidden">
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
<style scoped>
.gridd {
  display: grid;
  grid-template-rows: 7fr 2fr;
}
</style>
