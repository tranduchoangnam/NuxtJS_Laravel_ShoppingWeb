import { TransitionGroup } from 'vue';
<template>
  <div class="flex items-center">
    <div class="text-grey text-[2rem]">
      <v-icon
        class="cursor-pointer"
        @click="
          current -= 3;
          current < 0 ? (current = slides.length + current) : current;
        "
        >mdi-chevron-left</v-icon
      >
    </div>
    <div v-for="index in 3" :key="index">
      <CardProduct
        class="ma-2"
        :data="slides[(current + index - 1) % slides.length]"
      />
    </div>
    <div class="text-grey text-[2rem]">
      <v-icon
        class="cursor-pointer text-[2rem]"
        @click="
          current += 3;
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
const slides = ref([
  {
    photo: "https://cdn.boo.vn/media/catalog/product/b/o/boo_3299_4.jpg",
    title: "ÁO THUN NAM CỔ TRÒN IN HÌNH",
    price: "199.000đ",
    color: "#FFFFFF",
    size: "S",
  },
  {
    photo:
      "https://cdn.boo.vn/media/catalog/product/1/_/1.2.29.3.18.002.223.23-10400011-bst-1_2.jpg",
    title: "ÁO THUN NAM CỔ TRÒN IN HÌNH",
    price: "199.000đ",
    color: "#FFFFFF",
    size: "S",
  },
  {
    photo: "https://cdn.boo.vn/media/catalog/product/0/l/0l7a2057.jpg",
    title: "ÁO THUN NAM CỔ TRÒN IN HÌNH",
    price: "199.000đ",
    color: "#FFFFFF",
    size: "S",
  },
  {
    photo:
      "https://cdn.boo.vn/media/catalog/product/1/_/1.2.16.3.06.012.123.23-10400041-bst-1.jpg",
    title: "ÁO THUN NAM CỔ TRÒN IN HÌNH",
    price: "199.000đ",
    color: "#FFFFFF",
    size: "S",
  },
  {
    photo:
      "https://cdn.boo.vn/media/catalog/product/1/_/1.2.02.3.18.010.123.01-30600017-bst-1.jpg",
    title: "ÁO THUN NAM CỔ TRÒN IN HÌNH",
    price: "199.000đ",
    color: "#FFFFFF",
    size: "S",
  },
  {
    photo:
      "https://cdn.boo.vn/media/catalog/product/1/_/1.2.02.3.18.011.123.01-31300019-bst-1.jpg",
    title: "ÁO THUN NAM CỔ TRÒN IN HÌNH",
    price: "199.000đ",
    color: "#FFFFFF",
    size: "S",
  },
  {
    photo:
      "https://cdn.boo.vn/media/catalog/product/1/_/1.0.02.3.22.019.123.23-10200011-bst-1.jpg",
    title: "ÁO THUN NAM CỔ TRÒN IN HÌNH",
    price: "199.000đ",
    color: "#FFFFFF",
    size: "S",
  },
]);
onMounted(() => {
  setInterval(() => {
    current.value += 3;
    current.value >= slides.value.length
      ? (current.value = current.value - slides.value.length)
      : current.value;
  }, 10000);
});
</script>
