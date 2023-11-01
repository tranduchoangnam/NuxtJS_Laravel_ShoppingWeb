<template>
  <div>
    <SlideWebBanner />
    <GroupProduct
      v-if="newArrival"
      title="NEW ARRIVAL"
      :type="0"
      :data="newArrival"
    />
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
import axios from "axios";
const toggle = ref(false);
const newArrival = ref(null);
const token = "1|eVOCuj4qz9gRDjKXY9YaNTVGg30sWLMbiwJZWqvq4f6c7640";
onMounted(async () => {
  try {
    const response = await axios.get(
      "http://exchange.shop.local:8000/api/api/products",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
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
