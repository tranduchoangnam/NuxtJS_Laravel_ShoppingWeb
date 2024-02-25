<template>
  <div>
    <select class="w-full border-input px-4 py-2 mb-4" v-model="selected">
      <option disabled :value="null">Choose {{ type }}</option>
      <option v-for="ele in data" :key="ele.Id" :value="ele">
        {{ ele.Name }}
      </option>
    </select>
  </div>
</template>
<script setup lang="ts">
const emit = defineEmits(["inputValue"]);
import { City, District, Ward } from "@/utils/types";
// const data = ref<City[]>([]);
// const address = ref("");
// const selectedCity = ref<City | null>(null);
// const selectedDistrict = ref<District | null>(null);
// const selectedWard = ref<Ward | null>(null);
defineProps({
  type: {
    type: String,
    required: true,
  },
  data: {
    type: Array as PropType<City[] | Ward[] | District[]>,
    required: true,
  },
});
const selected = ref<City | null>(null);
watch(selected, (e) => {
  emit("inputValue", e);
});
</script>
<style scoped>
::placeholder {
  color: #000000;
}
</style>
