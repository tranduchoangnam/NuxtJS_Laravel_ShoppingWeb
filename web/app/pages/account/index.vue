<template>
  <div class="wrapper px-4">
    <div class="text-[2rem] pb-4 border-b-[1px] border-[#000000]">
      MY ACCOUNT
    </div>
    <p class="text-[1.5rem] mt-4 mb-8">Personal Information</p>
    <div class="grid grid-cols-10 gap-8 text-gray-500">
      <div class="col-span-2 text-right flex flex-col">
        <p>Fullname</p>
        <p>Email</p>
        <p>Phone</p>
        <p>Address</p>
      </div>
      <div class="col-span-4 text-black">
        <p class="font-bold">
          {{ auth.user?.first_name }} {{ auth.user?.last_name }}
        </p>
        <p>{{ auth.user?.email }}</p>
        <p>
          {{
            auth.user?.phone
              ? auth.user?.phone
              : "You have not set phone number yet."
          }}
        </p>
        <p>
          {{
            auth.user?.address
              ? auth.user?.address
              : "You don't have a default address."
          }}
        </p>
      </div>
      <div class="col-span-2 text-right">
        <NuxtLink
          to="/account/edit"
          class="text-red-500 hover:border-b-[1px] hover:border-red-500"
        >
          Edit
        </NuxtLink>
      </div>
      <div class="col-span-2">
        <NuxtLink
          to="auth/change-password"
          class="text-red-500 hover:border-b-[1px] hover:border-red-500"
        >
          Change Password</NuxtLink
        >
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useAuthStore } from "@/store/auth";
useHead({
  title: "BOO | Account",
});
definePageMeta({
  layout: "account",
  middleware: "auth",
});

const auth = useAuthStore();

onMounted(async () => {
  await auth.get();
  //   console.log(auth.token);
  //   console.log(auth.user);
  //   console.log(token.value);
});
</script>
<style scoped></style>
