<template>
  <div
    class="flex items-center w-full h-[90%]"
    @mouseover="interval = false"
    @mouseleave="interval = true"
  >
    <div class="text-grey text-[2rem]">
      <v-icon
        class="cursor-pointer"
        @click="
          current -= 3;
          current < 0 ? (current = slides.data.length + current) : current;
        "
        >mdi-chevron-left</v-icon
      >
    </div>
    <div class="relative grid grid-cols-3 w-full h-full gap-4">
      <div
        v-for="index in 3"
        :key="index"
        class="w-full h-full overflow-hidden"
      >
        <CardProduct
          :data="slides.data[(current + index - 1) % slides.data.length]"
        />
      </div>
    </div>

    <div class="text-grey text-[2rem]">
      <v-icon
        class="cursor-pointer text-[2rem]"
        @click="
          current += 3;
          current >= slides.data.length
            ? (current = current - slides.data.length)
            : current;
        "
        >mdi-chevron-right</v-icon
      >
    </div>
  </div>
</template>
<script setup lang="ts">
const slides = defineProps({
  data: {
    type: Array<Object>,
    required: true,
  },
});
const current = ref(0);
const interval = ref(true);
onMounted(() => {
  setInterval(() => {
    if (interval.value) {
      current.value += 3;
      current.value >= slides.data.length
        ? (current.value = current.value - slides.data.length)
        : current.value;
    }
  }, 4000);
});
</script>
