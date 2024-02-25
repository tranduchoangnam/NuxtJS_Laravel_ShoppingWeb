<template>
  <div class="flex flex-wrap p-16 bg-white w-full justify-center">
    <HeaderMenuItems
      v-for="(data, index) in items[nav].item"
      :key="index"
      :title="data.title"
      :link="data.link"
      :list="data.list"
    />
  </div>
</template>
<script setup lang="ts">
defineProps({
  nav: {
    type: Number,
    required: true,
  },
});
const items = ref([
  {
    item: [
      {
        title: "Welcome",
        link: "/graphic",
        list: [],
      },
    ],
  },
  {
    item: [
      {
        title: "TOP",
        link: "/",
        list: [
          { name: "T-shirt", link: "/" },
          { name: "Polo", link: "/" },
          { name: "Gile", link: "/" },
          { name: "Shirt", link: "/" },
          { name: "Sweatshirt & Hoodies", link: "/" },
        ],
      },
      {
        title: "BOTTOM",
        link: "/",
        list: [
          { name: "Jeans", link: "/" },
          { name: "Jogger", link: "/" },
          { name: "Khaki", link: "/" },
          { name: "Short", link: "/" },
          { name: "Skirt", link: "/" },
        ],
      },
      {
        title: "ACCESSORIES",
        link: "/",
        list: [],
      },
    ],
  },
  {
    item: [
      {
        title: "TOP",
        link: "/",
        list: [
          { name: "T-shirt", link: "/" },
          { name: "Polo", link: "/" },
          { name: "Gile", link: "/" },
          { name: "Shirt", link: "/" },
          { name: "Sweatshirt & Hoodies", link: "/" },
        ],
      },
      {
        title: "BOTTOM",
        link: "/",
        list: [
          { name: "Jeans", link: "/" },
          { name: "Jogger", link: "/" },
          { name: "Khaki", link: "/" },
          { name: "Short", link: "/" },
          { name: "Pant", link: "/" },
        ],
      },
      {
        title: "ACCESSORIES",
        link: "/",
        list: [],
      },
    ],
  },
  {
    item: [
      {
        title: "Explore Now",
        link: "/graphic",
        list: [],
      },
    ],
  },
  {
    item: [
      {
        title: "FLEX TO SCHOOL",
        link: "/collection/flex-to-school",
        list: [],
      },
      {
        title: "MARVEL GO VN",
        link: "/collection/marvel-go-vn",
        list: [],
      },
      {
        title: "BOO LAAB x HANOI BUFFALOES",
        link: "/collection/hnbxboolaab",
        list: [],
      },

      {
        title: "BOOLAAB INFINITEE 07",
        link: "/collection/infinite-07",
        list: [],
      },
      {
        title: "BOOLAAB EXPERIMENTAL",
        link: "/collection/boolaab",
        list: [],
      },
      {
        title: "BOO ESSENTIALS",
        link: "/collection/booxessentials",
        list: [],
      },
      {
        title: "BOO LOONEY TUNES",
        link: "/collection/looney-tunes",
        list: [],
      },
    ],
  },
  {
    item: [
      {
        title: "SALE UP TO 80%",
        link: "/",
        list: [],
      },
      {
        title: "BUY 2 SALE 20% - BUY 3 SALE 30% Hot",
        link: "/",
        list: [],
      },
    ],
  },
  //Man
]);
</script>
