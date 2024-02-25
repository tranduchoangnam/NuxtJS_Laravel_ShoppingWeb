<template>
  <div id="wrapper" class="w-full px-4 py-12">
    <p class="text-[1.6rem] mb-4">RETAIL STORE SYSTEM</p>
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full h-[35rem]">
      <div class="flex flex-col h-full">
        <div class="grid grid-cols-2 grid-rows-2 gap-x-4">
          <InputAddress
            :data="cities"
            :key="renderKey"
            type="City"
            @inputValue="
              (e) => {
                inputCity = e.Name;
                districts = e.Districts;
              }
            "
          />
          <InputAddress
            :data="districts"
            :key="renderKey + 1"
            type="District"
            @inputValue="(e) => (inputDistrict = e.Name)"
          />
          <button
            @click="search"
            class="w-full border-input px-4 py-2 mb-4 text-white bg-[#000000]"
          >
            SEARCH
          </button>
          <button
            @click="reset"
            class="w-full border-input px-4 py-2 mb-4 text-white bg-[#000000]"
          >
            RESET
          </button>
        </div>
        <div class="border-input overflow-scroll h-[30rem]">
          <CardStore
            v-for="(store, index) in stores"
            :key="index"
            :data="store"
          />
          <p v-if="stores.length === 0" class="text-center mt-4">
            No store found
          </p>
        </div>
      </div>

      <div class="flex flex-col h-full">
        <div
          class="w-full flex justify-center border-input px-4 py-2 mb-4 text-white bg-[#000000]"
        >
          <p>Retail Store Images</p>
        </div>
        <div class="flex:1 h-full">
          <img
            class="h-full object-cover"
            src="https://cdn.boo.vn/media/catalog/category/2020-11-15.jpg"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import axios from "axios";
import { City, District, Store } from "@/utils/types";
const inputCity = ref("");
const inputDistrict = ref("");
const cities = ref<City[]>([]);
const districts = ref<District[]>([]);
const stores = ref<Store[]>([]);
const storesAlias = ref<Store[]>([]);
const renderKey = ref(0);
const reset = () => {
  inputCity.value = "";
  inputDistrict.value = "";
  districts.value = [];
  renderKey.value++;
  stores.value = storesAlias.value;
};
const search = () => {
  stores.value = storesAlias.value.filter((e) =>
    e.address.includes(inputDistrict.value + ", " + inputCity.value)
  );
};
onMounted(async () => {
  try {
    const res = await axios.get("/db.address.json");
    cities.value = res.data;
    const res2 = await axios.get("/db.stores.json");
    stores.value = res2.data;
    storesAlias.value = res2.data;
  } catch (e) {
    console.log(e);
  }
});
</script>
<style scoped>
@media screen and (min-width: 1280px) {
  #wrapper {
    padding-left: 4rem !important;
    padding-right: 4rem !important;
  }
}
</style>
