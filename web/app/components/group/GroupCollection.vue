<template>
  <div class="grid grid-cols-3 w-full mb-16">
    <a class="overflow-hidden" href="/">
      <img class="swipe" :src="link[current]"
    /></a>
    <a class="overflow-hidden" href="/">
      <img class="swipe" :src="link[current + 2]"
    /></a>
    <a href="/"><img :src="link[4]" /></a>
  </div>
</template>
<script setup lang="ts">
const current = ref(0);
const link = ref([
  "https://cdn.boo.vn/media/wysiwyg/mobile-1409-sfw.gif",
  "https://cdn.boo.vn/media/wysiwyg/mobi.JPG",
  "https://cdn.boo.vn/media/wysiwyg/Mobile-600x1016px-min.png",
  "https://cdn.boo.vn/media/wysiwyg/online_webbanner_mobile.png",
  "https://cdn.boo.vn/media/wysiwyg/mobi_1.png",
]);
onMounted(() => {
  setInterval(() => {
    current.value = 1 - current.value;
  }, 4000);
});
</script>
<style>
.swipe {
  animation-name: swipe;
  animation-duration: 4s;
  animation-iteration-count: infinite;
  overflow: hidden;
}
@keyframes swipe {
  0% {
    transform: translateX(30%);
  }
  20% {
    transform: translateX(0%);
  }
  80% {
    transform: translateX(0%);
  }
  100% {
    transform: translateX(-30%);
  }
}
</style>
