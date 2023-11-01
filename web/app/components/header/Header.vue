<template>
  <div class="fixed !z-[1000] top-0 left-0 w-full bg-white text-[1.15rem]">
    <div class="flex px-16 items-center justify-between border-b-2 h-[5rem]">
      <img src="https://cdn.boo.vn/media/logo/stores/1/logo.png" />
      <div class="hidden lg:flex items-center">
        <!-- <div class="border px-2 rounded-md bg-blue-700 text-white">Graphic</div> -->
        <div
          v-for="(name, index) in listNav"
          :key="index"
          :name="name"
          class="h-[4rem] px-6 flex items-center cursor-pointer hover:font-black"
          @mouseover="
            hoverNav = name;
            lastNav = name;
          "
          @mouseleave="delayMouse"
        >
          <HeaderNav
            :name="name"
            :class="index === 0 ? 'graphic' : index === 5 ? 'text-red-500' : ''"
          />
        </div>
      </div>
      <v-card-actions>
        <v-icon @click="next">mdi-magnify</v-icon>
        <v-icon @click="next" class="ml-4">mdi-heart-outline</v-icon>
        <v-icon @click="next" class="ml-4">mdi-cart-outline</v-icon>
        <v-icon @click="next" class="ml-4">mdi-account-outline</v-icon>
      </v-card-actions>
    </div>
    <HeaderMenu
      class="absolute top-[4rem] left-0 w-full"
      v-if="lastNav"
      :nav="listNav.indexOf(lastNav)"
      @mouseover="hoverNav = lastNav"
      @mouseleave="
        hoverNav = '';
        delayMouse();
      "
    />
  </div>
</template>
<script setup lang="ts">
const lastNav = ref("");
const hoverNav = ref("");
const listNav = [
  "GRAPHIC",
  "WOMEN",
  "MAN",
  "NEW ARRIVAL",
  "COLLECTION",
  "DISCOUNT",
];
const delayMouse = () => {
  setTimeout(() => {
    if (!hoverNav.value) {
      lastNav.value = "";
    }
  }, 10);
};
const next = () => {};
</script>
<style scoped>
.graphic {
  padding-left: 0.5rem;
  padding-right: 0.5rem;
  border-radius: 0.375rem;
  background-color: #251afc;
  color: white;
}
</style>
