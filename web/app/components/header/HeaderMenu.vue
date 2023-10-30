<template>
  <div class="flex flex-wrap p-16 bg-white w-full justify-center">
    <HeaderMenuItems
      v-for="(data, index) in items[nav].item"
      :key="index"
      :title="data.title"
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
        list: [],
      },
    ],
  },
  {
    item: [
      {
        title: "TOP",
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
        list: [],
      },
    ],
  },
  {
    item: [
      {
        title: "TOP",
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
        list: [],
      },
    ],
  },
  {
    item: [
      {
        title: "TOP",
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
        list: [],
      },
    ],
  },
  {
    item: [
      {
        title: "FLEX TO SCHOOL",
        list: [],
      },
      {
        title: "MARVEL GO VN",
        list: [],
      },
      {
        title: "BOO LAAB x HANOI BUFFALOES",
        list: [],
      },

      {
        title: "BOOLAAB INFINITEE 07",
        list: [],
      },
      {
        title: "BOOLAAB EXPERIMENTAL",
        list: [],
      },
      {
        title: "BOO ESSENTIAL",
        list: [],
      },
      {
        title: "BOO LOONEY TUNES",
        list: [],
      },
    ],
  },
  {
    item: [
      {
        title: "SALE UP TO 80%",
        list: [],
      },
      {
        title: "BUY 2 SALE 20% - BUY 3 SALE 30% Hot",
        list: [],
      },
    ],
  },
  //Man
]);
</script>
