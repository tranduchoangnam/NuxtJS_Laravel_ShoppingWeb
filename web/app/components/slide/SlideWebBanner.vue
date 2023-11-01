<template>
  <div class="flex relative items-center mb-16">
    <div class="absolute left-0 top-1/2 text-grey text-[2rem]">
      <v-icon
        class="cursor-pointer"
        @click="
          current -= 1;
          current < 0 ? (current = slides.length + current) : current;
        "
        >mdi-chevron-left</v-icon
      >
    </div>
    <img class="w-full" :src="slides[current]" />
    <div class="absolute right-0 top-1/2 text-grey text-[2rem]">
      <v-icon
        class="cursor-pointer text-[2rem]"
        @click="
          current += 1;
          current >= slides.length
            ? (current = current - slides.length)
            : current;
        "
        >mdi-chevron-right</v-icon
      >
    </div>
  </div>
</template>
<script setup lang="ts">
const current = ref(0);
const slides = [
  "https://cdn.boo.vn/media/wysiwyg/trang_chu_1209-02-compressed.jpg",
  "https://cdn.boo.vn/media/wysiwyg/1920x950px-3_1.jpg",
  "https://cdn.boo.vn/media/wysiwyg/online_webbanner_pc.png",
  "https://cdn.boo.vn/media/wysiwyg/1920x950px-4_2.png",
];
onMounted(() => {
  setInterval(() => {
    current.value += 1;
    current.value >= slides.length
      ? (current.value = current.value - slides.length)
      : current.value;
  }, 8000);
});
</script>
