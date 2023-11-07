<template>
  <div>
    <select class="w-full border-input px-4 py-1 mb-4" v-model="selectedCity">
      <option disabled :value="null">Choose City</option>
      <option v-for="city in data" :key="city.Id" :value="city">
        {{ city.Name }}
      </option>
    </select>

    <select
      class="w-full border-input px-4 py-1 mb-4"
      v-model="selectedDistrict"
    >
      <option disabled :value="null">Choose District</option>
      <option
        v-for="district in selectedCity?.Districts"
        :key="district.Id"
        :value="district"
      >
        {{ district.Name }}
      </option>
    </select>

    <select class="w-full border-input px-4 py-1 mb-4" v-model="selectedWard">
      <option disabled :value="null">Choose Ward</option>
      <option
        v-for="ward in selectedDistrict?.Wards"
        :key="ward.Id"
        :value="ward"
      >
        {{ ward.Name }}
      </option>
    </select>
    <input
      class="w-full border-input px-4 py-1 mb-4"
      v-model="address"
      placeholder="Address"
      @blur="getFullAddress"
    />
  </div>
</template>
<script setup lang="ts">
import axios from "axios";
const emit = defineEmits(["inputValue"]);
interface Ward {
  Id: string;
  Name: string;
  Level: string;
}
interface District {
  Id: string;
  Name: string;
  Wards: Ward[];
}
interface City {
  Id: string;
  Name: string;
  Districts: District[];
}
const data = ref<City[]>([]);
const address = ref("");
const selectedCity = ref<City | null>(null);
const selectedDistrict = ref<District | null>(null);
const selectedWard = ref<Ward | null>(null);

const getFullAddress = () => {
  if (selectedWard.value)
    emit(
      "inputValue",
      address.value +
        ", " +
        selectedWard.value?.Name +
        ", " +
        selectedDistrict.value?.Name +
        ", " +
        selectedCity.value?.Name
    );
};
onMounted(async () => {
  try {
    const res = await axios.get("/db.address.json");
    data.value = res.data;
  } catch (e) {
    console.log(e);
  }
});
</script>
<style scoped>
::placeholder {
  color: #000000;
}
</style>
