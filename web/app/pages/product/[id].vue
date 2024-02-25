<template>
  <div v-if="product" class="grid lg:grid-cols-2 grid-cols-1 grid-flow-row">
    <div class="hidden lg:block">
      <img class="w-full object-cover" :src="product.image[currentImage]" />
    </div>
    <div id="product-details" class="w-full py-16 overflow-y-auto">
      <div class="w-[70%] mx-auto">
        <p class="text-[1.3rem]">{{ product.name }}</p>
        <p class="text-[0.7rem]">SKU: {{ product.sku }}</p>
        <div class="flex my-4 items-center">
          <p class="text-red-600 mr-4 text-[1.2rem]">
            {{ convertStr(product.price) }}
          </p>
          <p v-if="product.old_price" class="line-through mr-4">
            {{ convertStr(product.old_price) }}
          </p>
          <p v-if="product.discount" class="text-red-600">
            -{{ product.discount }}%
          </p>
        </div>
        <div class="w-full flex items-center flex-wrap">
          <div
            v-for="(img, index) in product.image"
            :key="index"
            class="mr-4 my-2"
            @mouseover="
              currentImage = index;
              if (index < product.color.length) currentColor = index;
              else currentColor = 0;
            "
            :class="
              currentImage === index ? 'border-[0.2rem] border-gray-400' : ''
            "
          >
            <img class="w-[5rem] object-cover" :src="img" />
          </div>
        </div>
        <div class="flex items-center mt-4">
          <p class="font-bold">Color:</p>
          <ButtonColor
            class="w-[1.5rem]"
            v-for="(color, index) in product.color"
            :key="index"
            :color="color"
            @click="
              currentColor = index;
              currentImage = index;
            "
            :class="currentColor === index ? '!border-[0.2rem]' : ''"
          />
        </div>
        <div class="mb-4 text-red-600">
          {{ errorColor }}
        </div>
        <div class="flex">
          <div class="flex flex-col w-[7rem]">
            <ButtonRounded
              @click="toggleSize = !toggleSize"
              class="border-black"
            >
              <template #name>
                <div class="flex w-full justify-between px-4">
                  <p class="mr-4">
                    {{ currentSize + 1 ? product.size[currentSize] : "Size" }}
                  </p>
                  <v-icon>mdi-chevron-down</v-icon>
                </div>
              </template>
            </ButtonRounded>

            <div class="relative w-full">
              <div
                class="absolute w-full z-10 bg-[#000000] bg-opacity-[0.1] rounded-lg"
              >
                <div
                  class="my-1"
                  v-if="toggleSize"
                  v-for="(size, index) in product.size"
                  :key="index"
                  @click="
                    currentSize = index;
                    toggleSize = !toggleSize;
                  "
                >
                  <ButtonRounded
                    @mouseover="currentSize = index"
                    :class="currentSize === index ? 'border-black' : 'border'"
                  >
                    <template #name>{{ size }}</template>
                  </ButtonRounded>
                </div>
              </div>
            </div>
          </div>
          <ButtonRounded
            @click="toggleSizeBox = !toggleSizeBox"
            class="border-black w-auto ml-4"
          >
            <template #name>
              <div class="flex w-full justify-between px-4">
                <p>Size Guide</p>
              </div>
            </template>
          </ButtonRounded>

          <ThemeDark v-if="toggleSizeBox">
            <template #content>
              <div class="relative w-[80%]">
                <img
                  class="rounded-xl"
                  src="https://cdn.boo.vn/media/wysiwyg/b_ng_size_B_NG_SIZE_O-compressed.jpg"
                />
                <div class="absolute top-[1rem] right-[1rem]">
                  <v-icon
                    @click="toggleSizeBox = !toggleSizeBox"
                    class="w-[1rem]"
                    >mdi-close</v-icon
                  >
                </div>
              </div>
            </template>
          </ThemeDark>
        </div>
        <div v-if="errorSize" class="text-red-600">{{ errorSize }}</div>

        <div class="flex items-center my-8">
          <ButtonRounded
            bg-color="#000000"
            text-color="#ffffff"
            class="w-auto px-4"
            @click="
              validate();
              if (!errorColor && !errorSize) {
                cart.addToCart(product, currentColor, currentSize);
              }
            "
          >
            <template #name>
              <div class="w-auto">
                <p>ADD TO CART</p>
              </div>
            </template>
          </ButtonRounded>
          <ButtonRounded
            bg-color="#daf9e6"
            text-color="#000000"
            class="w-auto px-4 mx-4 border-black"
            @click="
              validate();
              if (!errorColor && !errorSize) {
                orders.addToOrders(null, {
                  product,
                  chosenColor: currentColor,
                  chosenSize: currentSize,
                  quantity: 1,
                });
                navigateTo('/orders');
              }
            "
          >
            <template #name>
              <div class="w-auto">
                <p>BUY NOW</p>
              </div>
            </template>
          </ButtonRounded>
          <div
            class="rounded-full flex items-center justify-center p-1 bg-white shadow-lg cursor-pointer"
            @click="
              liked
                ? wish.removeFromWishlist(product)
                : wish.addToWishlist(product)
            "
          >
            <v-icon :class="{ 'text-red-600': liked }">mdi-heart</v-icon>
          </div>
        </div>
        <div class="w-full border-black py-4 px-6">
          <h4><strong>DESCRIPTION</strong></h4>
          <p style="white-space: pre-wrap">
            {{ breakLine(product.description) }}
          </p>
        </div>
      </div>
    </div>
    <div v-for="(e, index) in filteredImages" :key="index">
      <img :src="e" />
    </div>
    <div v-if="product.image.length % 2 === 0">
      <img :src="product.image[currentImage]" />
    </div>
  </div>
  <div v-else><CardLoading class="w-screen h-screen" /></div>
</template>
<script setup lang="ts">
import { useRoute } from "vue-router";
import { onMounted, ref } from "vue";
import { useCartStore } from "~/store/cart";
import { useOrdersStore } from "~/store/orders";
import { useWishlistStore } from "~/store/wishlist";
import { convertStr } from "~/utils/convert";
import axios from "axios";

const cart = useCartStore();
const orders = useOrdersStore();
const wish = useWishlistStore();

const route = useRoute();

const currentImage = ref(0);
const currentColor = ref(0);
const errorColor = ref("");
const currentSize = ref();
const errorSize = ref("");

const toggleSize = ref(false);
const toggleSizeBox = ref(false);
const liked = ref(false);

const product = ref();

const filteredImages = computed<Array<string>>(() => {
  return product.value.image.filter(
    (img: any, index: Number) => index !== currentImage.value
  );
});
const validate = () => {
  if (currentColor.value + 1) errorColor.value = "";
  else errorColor.value = "Please choose color!";
  if (currentSize.value + 1) errorSize.value = "";
  else errorSize.value = "Please choose size!";
};
watch(currentColor, () => {
  if (currentColor.value + 1) errorColor.value = "";
  else errorColor.value = "Please choose color!";
});
watch(currentSize, () => {
  if (currentSize.value + 1) errorSize.value = "";
  else errorSize.value = "Please choose size!";
});

const breakLine = (str: string) => {
  var s = "";
  for (var i = 0; i < str.length; i++) {
    if (str[i] === "-") s += "\n";
    s += str[i];
  }
  return s;
};

watch(wish, () => {
  liked.value = wish.checkIfExist(product.value);
});

onMounted(async () => {
  try {
    const res = await axios.get(`/api/api/products/search/${route.params.id}`);
    product.value = res.data;
    console.log(product.value);
    liked.value = wish.checkIfExist(product.value);
  } catch (error) {
    console.error("Request failed:", error);
  }
}),
  // When accessing /posts/1, route.params.id will be 1
  console.log(route.params.id);
useHead({
  title: "BOO | Product",
});
</script>
<style>
.border-black {
  border: 1px solid black;
}
</style>
