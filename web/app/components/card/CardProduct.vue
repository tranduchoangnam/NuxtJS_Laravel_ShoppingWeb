import DataHandler from 'ioredis/built/DataHandler';
<template>
  <v-card width="22rem" flat color="var(--color-background)">
    <v-img :src="data.photo" />
    <div class="flex mt-4 flex-col items-center">
      <div class="h-[3rem]">{{ data.title }}</div>
      {{ data.price }}
    </div>
    <div class="flex mt-4 justify-center">
      <ButtonColor color="#FFFFFF" />
      <ButtonColor color="#33FA4D" />
      <ButtonColor color="#33FA1D" />
      <ButtonColor color="black" />
    </div>
  </v-card>
</template>
<script setup lang="ts">
defineProps({
  data: {
    type: Object,
    required: true,
  },
});
</script>
