<template>
  <div class="grid grid-cols-3 w-full mb-16">
    <a class="overflow-hidden" :href="link[current].href">
      <img class="swipe" :src="link[current].img"
    /></a>
    <a class="overflow-hidden" :href="link[current + 2].href">
      <img class="swipe" :src="link[current + 2].img"
    /></a>
    <a :href="link[4].href"><img :src="link[4].img" /></a>
  </div>
</template>
<script setup lang="ts">
const current = ref(0);
const link = ref([
  {
    img: "https://cdn.boo.vn/media/wysiwyg/mobile-1409-sfw.gif",
    href: "/graphic",
  },
  {
    img: "https://cdn.boo.vn/media/wysiwyg/mobi.JPG",
    href: "/collection/flex-to-school",
  },
  {
    img: "https://cdn.boo.vn/media/wysiwyg/Mobile-600x1016px-min.png",
    href: "/collection/looney-tunes",
  },
  {
    img: "https://cdn.boo.vn/media/wysiwyg/online_webbanner_mobile.png",
    href: "/collection/marvel-go-vn",
  },
  {
    img: "https://cdn.boo.vn/media/wysiwyg/mobi_1.png",
    href: "/collection/hnbxboolaab",
  },
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
