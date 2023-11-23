<template>
  <div>
    <SlideWebBanner />
    <GroupProduct
      v-if="newArrival"
      title="NEW ARRIVAL"
      :type="0"
      :data="newArrival"
    />
    <CardLoadingSkeleton />
    <GroupProduct
      v-if="newArrival"
      title="BEST SELLER"
      :type="0"
      :data="newArrival"
    />
    <GroupProduct
      v-if="newArrival"
      title="BEST PRICE"
      :type="1"
      :data="newArrival"
    />
    <ModernTitle name="MIX & MATCH" />
    <img
      class="mb-16"
      src="https://cdn.boo.vn/media/wysiwyg/Ivory_Silver_Clean_Grid_Wedding_Instagram_Story_Video_2_.jpg"
    />
    <ModernTitle name="NEW COLLECTION" />
    <GroupCollection />
    <ModernTitle name="BOO | BRAND" />
    <GroupBrand class="mb-16" />
  </div>
</template>
<script setup lang="ts">
import axios from "axios";
import ModernTitle from "~/components/title/ModernTitle.vue";
useHead({
  title: "BOO | Home",
});
const newArrival = ref(null);
onMounted(async () => {
  try {
    const response = await axios.get("/api/api/products");
    // Handle the response data here
    newArrival.value = response.data;
    console.log(response.data);
  } catch (error) {
    // Handle errors here
    console.error("Request failed:", error);
  }
});
</script>
<style>
v-icon {
  cursor: pointer;
}
</style>
