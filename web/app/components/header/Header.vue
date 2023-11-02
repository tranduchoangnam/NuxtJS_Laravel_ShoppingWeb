<template>
  <div class="fixed !z-[1000] top-0 left-0 w-full bg-white text-[1.15rem]">
    <div class="flex px-16 items-center justify-between border-b-2 h-[5rem]">
      <NuxtLink to="/"
        ><img src="https://cdn.boo.vn/media/logo/stores/1/logo.png" />
      </NuxtLink>
      <div class="hidden lg:flex items-center">
        <!-- <div class="border px-2 rounded-md bg-blue-700 text-white">Graphic</div> -->
        <NuxtLink
          v-for="(nav, index) in listNav"
          :to="nav.link"
          :key="index"
          :name="nav.title"
          class="h-[4rem] px-6 flex items-center cursor-pointer hover:font-black"
          @mouseover="
            hoverNav = nav.title;
            lastNav = nav.title;
          "
          @mouseleave="delayMouse"
        >
          <HeaderNav
            :name="nav.title"
            :class="index === 0 ? 'graphic' : index === 5 ? 'text-red-500' : ''"
          />
        </NuxtLink>
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
      :nav="showIndex(lastNav)"
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
  { title: "GRAPHIC", link: "/graphic" },
  { title: "WOMEN", link: "/" },
  { title: "MAN", link: "/" },
  { title: "NEW ARRIVAL", link: "/" },
  { title: "COLLECTION", link: "/" },
  { title: "DISCOUNT", link: "/" },
];
const showIndex = (item: string) => {
  const index = listNav.findIndex((navItem) => navItem.title === item);
  return index;
};
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
