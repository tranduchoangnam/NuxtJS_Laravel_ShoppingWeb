<template>
  <div>
    <SlideWebBanner />
    <GroupProduct title="NEW ARRIVAL" :type="0" />
    <GroupProduct title="BEST SELLER" :type="0" />
    <GroupProduct title="BEST PRICE" :type="1" />
    <ModernTitle name="MIX & MATCH" />
    <img
      class="mb-16"
      src="https://cdn.boo.vn/media/wysiwyg/Ivory_Silver_Clean_Grid_Wedding_Instagram_Story_Video_2_.jpg"
    />
    <ModernTitle name="NEW COLLECTION" />
    <GroupCollection />
    <ModernTitle name="BOO | BRAND" />
    <GroupBrand class="mb-16" />
    <div class="flex">
      <button>
        <v-icon @click="toggle = !toggle">mdi-chevron-right</v-icon>
      </button>
      <div
        class="transition ease-in-out translate-x-[50%] fade-0 duration-1000"
      >
        <p v-if="toggle">Hello</p>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
const toggle = ref(false);
</script>
<style>
v-icon {
  cursor: pointer;
}
</style>
