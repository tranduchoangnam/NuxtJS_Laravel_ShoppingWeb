<template>
  <div class="w-full aspect-[1/2]">
    <div class="relative h-[75%] overflow-hidden">
      <NuxtLink :to="'/product/' + data.id" class="h-full w-full">
        <img
          class="object-cover h-full"
          :src="data.image[currentColor]"
          @mouseover="next(data.image.length - 1)"
          @mouseleave="back(data.image.length - 1)"
        />
      </NuxtLink>

      <div
        class="absolute flex z-50 bottom-4 right-4 rounded-full items-center justify-center p-1 bg-white shadow-lg cursor-pointer"
        @click="
          if (auth.token)
            liked ? wish.removeFromWishlist(data) : wish.addToWishlist(data);
          else navigateTo('/auth/signin');
        "
      >
        <v-icon :class="liked ? 'text-red-600' : ''">mdi-heart</v-icon>
      </div>
    </div>

    <div class="@container h-[25%] flex flex-col items-center justify-between">
      <div class="w-full h-[50%] pt-1">
        <p
          class="@[13rem]:text-[1.2rem] @[13rem]:pt-3 text-[0.7rem] text-center line-clamp-2"
        >
          {{ data.name }}
        </p>
      </div>
      <div
        class="@[13rem]:text-[1.2rem] text-[0.7rem] flex justify-evenly items-center w-full"
      >
        <p v-if="data.old_price" class="line-through">
          {{ convertStr(data.old_price) }}
        </p>
        <p class="text-red-800">
          {{ convertStr(data.price) }}
        </p>
        <p v-if="data.discount" class="text-red-600">-{{ data.discount }}%</p>
      </div>

      <div class="flex justify-center w-full">
        <ButtonColor
          v-for="(color, index) in data.color"
          :key="index"
          :color="color"
          @click="currentColor = index"
          class="w-[10%] aspect-[1/1]"
          :class="currentColor === index ? 'border-[0.2rem]' : ''"
        />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { convertStr } from "~/utils/convert";
import { useWishlistStore } from "~/store/wishlist";
import { useAuthStore } from "~/store/auth";
const wish = useWishlistStore();
const auth = useAuthStore();
const liked = ref(false);

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

const product = defineProps({
  data: {
    type: Object,
    required: true,
  },
});
watch(
  () => product.data.id,
  () => {
    liked.value = wish.checkIfExist(product.data);
  },
  { immediate: true }
);
watch(wish, () => {
  liked.value = wish.checkIfExist(product.data);
});
</script>
<style scoped>
.gridd {
  display: grid;
  grid-template-rows: 7fr 2fr;
}
</style>
