<template>
  <div class="w-full">
    <div
      class="mb-4 pb-4 border-b-[1px] border-[#000000] flex items-center justify-between"
    >
      <span class="text-[2rem]">ORDERS</span>
      <span class="cursor-pointer hover:font-bold" @click="orders.removeOrders"
        >Remove All</span
      >
    </div>
    <div v-for="(order, index) in orders.list" :key="index">
      <div class="w-full border-b-2 bg-black text-white py-2 px-4">
        <span>{{ new Date(order.date).toLocaleTimeString("vi") }}</span>
        <span>{{ new Date(order.date).toLocaleDateString("vi") }}</span>
        <span class="float-right text-orange-300 font-bold">{{
          order.status
        }}</span>
      </div>
      <div
        v-for="(product, indexP) in order.products"
        :key="indexP"
        class="border-b h-[10rem] flex items-center"
      >
        <div>
          <img
            :src="product.product.image[product.chosenColor]"
            class="h-[9rem]"
          />
        </div>
        <div class="h-[9rem] px-4 py-2 flex flex-col grow justify-center">
          <div class="flex justify-between items-center">
            <p>{{ product.product.name }}</p>
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
          <div class="my-4 w-full flex justify-between">
            <div class="flex">
              <div class="mr-8 flex items-center">
                <span>Color:</span>
                <ButtonColor
                  :color="product.product.color[product.chosenColor]"
                  class="w-[1rem] h-[1rem]"
                />
              </div>
              <span>Size: {{ product.product.size[product.chosenSize] }}</span>
            </div>
            <span>x{{ product.quantity }}</span>
          </div>
          <div class="flex items-center w-full justify-between">
            <span class="text-red-800">{{
              convertStr(product.product.price * product.quantity)
            }}</span>
          </div>
        </div>
      </div>
      <div class="w-full flex justify-between items-center px-4 border-b">
        <span class="flex"
          >{{ totalProduct(order.products) }}
          <p>Item</p>
          {{ totalProduct(order.products) > 1 ? "s" : "" }}</span
        >
        <span class="text-[1.5rem] text-red-800"
          >Total: {{ convertStr(totalCost(order.products)) }}</span
        >
      </div>
      <div class="w-full border-b-black border-b-[1px] mb-16">
        <ButtonRounded
          @click="
            auth.user ? navigateTo('/checkout') : navigateTo('/auth/signin');
            orders.currentOrder = order;
          "
          bg-color="#000000"
          text-color="#ffffff"
          class="my-4"
        >
          <template #name> CHECK OUT </template>
        </ButtonRounded>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useOrdersStore } from "~/store/orders";
import { convertStr } from "~/utils/convert";
import { useAuthStore } from "~/store/auth";
const auth = useAuthStore();
useHead({
  title: "BOO | Orders",
});
definePageMeta({
  layout: "account",
  middleware: "auth",
});

const orders = useOrdersStore();

const totalProduct = (list: any[]) => {
  return list.reduce((acc: number, cur: any) => {
    return acc + cur.quantity;
  }, 0);
};
const totalCost = (list: any[]) => {
  return list.reduce((acc: number, cur: any) => {
    return acc + cur.product.price * cur.quantity;
  }, 0);
};
onMounted(async () => {
  orders.getOrders();
});
</script>
<style scoped></style>
