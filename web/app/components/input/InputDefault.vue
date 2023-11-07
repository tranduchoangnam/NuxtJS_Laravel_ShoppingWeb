<template>
  <div class="w-full">
    <input
      class="w-full px-4 py-1"
      :class="{
        'border-error': input && validateFunc(input),
        'border-input': !input || !validateFunc(input),
      }"
      :type="type"
      :placeholder="placeholder"
      v-model="input"
    />
    <div class="text-[0.9rem] text-red mb-4">
      {{
        input
          ? validateFunc(input)
          : submit
          ? `${placeholder} is required.`
          : ""
      }}
    </div>
  </div>
</template>
<script setup lang="ts">
import { User } from "@/store/auth";
import { PropType } from "vue";
const input = ref("");
const data = defineProps({
  placeholder: {
    type: String,
    required: true,
  },
  validateFunc: {
    type: Function,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  submit: {
    type: Boolean,
    required: true,
  },
  userData: {
    type: Object as PropType<User>,
    required: false,
  },
});
onMounted(() => {
  input.value = data.userData
    ? (data.userData[init(data.placeholder) as keyof User] as string)
    : "";
});
const emit = defineEmits(["inputValue"]);
const init = (field: string) => {
  if (field === "Phone Number") return "phone";
  if (field === "First Name") return "first_name";
  if (field === "Last Name") return "last_name";
};
watch(input, (newValue) => {
  emit("inputValue", newValue);
});
</script>
<style>
.border-input {
  border: 1px solid black;
}
.border-error {
  border: 1px solid red;
}
</style>
