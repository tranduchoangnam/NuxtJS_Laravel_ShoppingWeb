<template>
  <div>
    <ThemeDark>
      <template #content>
        <div
          class="absolute flex flex-col right-0 top-0 h-screen w-[35rem] bg-white"
        >
          <div class="flex justify-between py-6 px-12 border-b">
            <span>CART ({{ totalProduct }})</span>
            <v-icon @click="$emit('response')">mdi-close</v-icon>
          </div>
          <div class="grow overflow-y-auto">
            <div
              v-for="(product, index) in listProduct"
              :key="index"
              class="border-b h-[10rem] flex items-center"
            >
              <div>
                <img
                  :src="product.product.image[product.chosenColor]"
                  class="h-[9rem]"
                />
              </div>
              <div class="h-[9rem] px-4 py-2 flex flex-col grow justify-center">
                <p>{{ product.product.name }}</p>
                <div class="my-4 flex">
                  <div class="mr-8 flex items-center">
                    <span>Color:</span>
                    <ButtonColor
                      :color="product.product.color[product.chosenColor]"
                      class="w-[1rem] h-[1rem]"
                    />
                  </div>
                  <span
                    >Size: {{ product.product.size[product.chosenSize] }}</span
                  >
                </div>
                <div class="flex items-center w-full justify-between">
                  <div class="w-[5rem] mr-8">
                    <ButtonRounded class="border-black p4">
                      <template #name>
                        <div
                          class="flex justify-between items-center w-full px-2"
                        >
                          <div
                            class="text-[0.7rem] cursor-pointer"
                            @click="
                              cart.removeFromCart(
                                product.product,
                                product.chosenColor,
                                product.chosenSize
                              )
                            "
                          >
                            <v-icon> mdi-minus</v-icon>
                          </div>
                          <p>{{ product.quantity }}</p>
                          <div
                            class="text-[0.7rem] cursor-pointer"
                            @click="
                              cart.addToCart(
                                product.product,
                                product.chosenColor,
                                product.chosenSize
                              )
                            "
                          >
                            <v-icon> mdi-plus</v-icon>
                          </div>
                        </div>
                      </template>
                    </ButtonRounded>
                  </div>
                  <span>{{
                    convertStr(product.product.price * product.quantity)
                  }}</span>
                  <NuxtLink
                    :to="`/product/${product.product.id}`"
                    class="text-[0.7rem] text-blue-600"
                  >
                    <div @click="$emit('response')">
                      <span>See more</span>
                      <v-icon>mdi-chevron-right</v-icon>
                    </div>
                  </NuxtLink>
                </div>
              </div>
            </div>
          </div>
          <div class="flex flex-col">
            <div
              class="flex w-full justify-between h-[2rem] border-t items-center px-12"
            >
              <p>Total:</p>
              <p>{{ convertStr(totalCost) }}</p>
            </div>
            <div
              class="flex w-full justify-center h-[3.5rem] border-t items-center"
            >
              <ButtonRounded
                class="!w-[70%]"
                bg-color="#000000"
                text-color="#ffffff"
              >
                <template #name>
                  <div class="flex justify-center items-center w-full px-2">
                    <p>PURCHASE</p>
                  </div>
                </template>
              </ButtonRounded>
            </div>
          </div>
        </div>
      </template>
    </ThemeDark>
  </div>
</template>
<script setup lang="ts">
import { useCartStore } from "@/store/cart";
import { convertStr } from "@/utils/convert";

const cart = useCartStore();
const listProduct = ref<any>([]);
const totalProduct = ref(0);
const totalCost = computed(() => {
  return listProduct.value.reduce((acc: number, cur: any) => {
    return acc + cur.product.price * cur.quantity;
  }, 0);
});
watch(cart, () => {
  listProduct.value = cart.list;
  totalProduct.value = cart.total;
});

defineEmits(["response"]);
</script>
<style scoped>
.p4 {
  padding-top: 4px !important;
  padding-bottom: 4px !important;
  cursor: auto !important;
}
</style>
