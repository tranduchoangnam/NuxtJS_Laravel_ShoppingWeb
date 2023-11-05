<template>
  <div>{{ auth.user?.first_name }}{{ auth.user?.last_name }}</div>
</template>
<script setup lang="ts">
import { useAuthStore } from "@/store/auth";
const auth = useAuthStore();
const token = useCookie<string | null>("token");

onMounted(async () => {
  auth.token = token.value;
  await auth.get();
  console.log(auth.token);
  console.log(auth.user);
  console.log(token.value);
});
</script>
