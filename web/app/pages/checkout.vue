<template>
  <div v-if="orders.currentOrder" class="px-32 py-16 flex">
    <div class="flex flex-col mr-8">
      <p class="text-[2rem]">PAYMENT METHODS</p>
      <div class="flex flex-col my-4">
        <div>
          <input
            type="radio"
            name="payment"
            id="cod"
            v-model="payment"
            value="cod"
            class="mr-4"
          />
          <label for="cod">Cash on delivery</label>
        </div>
        <div class="flex my-4">
          <input
            type="radio"
            name="payment"
            id="vnpay"
            v-model="payment"
            value="vnpay"
            class="mr-4"
          />
          <label class="flex items-center" for="vnpay"
            ><img
              class="w-[5rem] mr-4"
              src="https://boo.vn/static/version1700725840/frontend/Boo/default/vi_VN/Magenest_VNPAY/images/vnpay-logo.png"
            />
            VNPAY / Credit Card / Debit Card</label
          >
        </div>
        <div class="flex mb-4">
          <input
            type="radio"
            name="payment"
            id="momo"
            v-model="payment"
            value="momo"
            class="mr-4"
          />
          <label class="flex items-center" for="momo"
            ><img
              class="w-[2rem] mr-4"
              src="https://boo.vn/static/version1700725840/frontend/Boo/default/vi_VN/Magenest_MomoPay/images/momopay-logo.png"
            />
            MoMo wallet</label
          >
        </div>
      </div>
      <p class="text-[2rem]">ADDRESS</p>
      <div class="grid grid-cols-9 gap-8 text-gray-500 border">
        <div class="col-span-2 text-right flex flex-col">
          <p>Fullname</p>
          <p>Email</p>
          <p>Phone</p>
          <p>Address</p>
        </div>
        <div class="col-span-7 text-black">
          <p class="font-bold">
            {{ auth.user?.first_name }} {{ auth.user?.last_name }}
          </p>
          <p>{{ auth.user?.email }}</p>
          <p>
            {{
              auth.user?.phone
                ? auth.user?.phone
                : "You have not set phone number yet."
            }}
          </p>
          <p>
            {{
              auth.user?.address
                ? auth.user?.address
                : "You don't have a default address."
            }}
          </p>
        </div>
      </div>
    </div>
    <div class="w-full">
      <div class="flex justify-between items-center">
        <p class="text-[2rem]">All Items</p>
        <div class="rounded-full text-[0.7rem] px-4 py-2 bg-green-200">
          Free shipping on orders over 200.000 VND
        </div>
      </div>
      <div
        v-for="(product, indexP) in orders.currentOrder.products"
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
              <div>
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
          >{{ totalProduct(orders.currentOrder.products) }}
          <p>Item</p>
          {{ totalProduct(orders.currentOrder.products) > 1 ? "s" : "" }}</span
        >
        <span class="text-[1.5rem] text-red-800"
          >Total:
          {{ convertStr(totalCost(orders.currentOrder.products)) }}</span
        >
      </div>

      <div class="w-full border-b-black border-b-[1px] mb-16">
        <ButtonRounded
          @click=""
          bg-color="#000000"
          text-color="#ffffff"
          class="my-4"
        >
          <template #name> Pay </template>
        </ButtonRounded>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useOrdersStore } from "~/store/orders";
import { useAuthStore } from "~/store/auth";
import { convertStr } from "~/utils/convert";
useHead({
  title: "BOO | Check Out",
});
definePageMeta({
  middleware: "auth",
});
const orders = useOrdersStore();
const auth = useAuthStore();

const payment = ref("cod");

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
