<template>
  <div class="w-full p-4 border hover:bg-[#EEEEEE]">
    <div class="flex items-center justify-between">
      <p>{{ data.name }}</p>
      <NuxtLink
        :to="data.map"
        :external="true"
        target="_blank"
        class="rounded-full px-4 py-1 bg-[#000000] text-[0.9rem] text-white flex justify-center items-center"
      >
        <v-icon>mdi-map-marker</v-icon>
        <p class="ml-2">SHOW MAP</p>
      </NuxtLink>
    </div>
    <div class="text-gray-500 mt-2">
      <p>{{ data.address }}</p>
      <p>{{ data.hoursOpen }}</p>
      <p>{{ data.tel }}</p>
    </div>
  </div>
</template>
<script setup lang="ts">
import { PropType } from "vue";
import { Store } from "@/utils/types";
defineProps({
  data: {
    type: Object as PropType<Store>,
    required: true,
  },
});
</script>
