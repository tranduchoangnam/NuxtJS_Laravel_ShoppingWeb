<template>
  <!-- user menu -->
  <div
    class="absolute text-[1.2rem] z-[1000] w-[20rem] bottom-0 right-0 translate-y-full"
  >
    <div class="mt-4">
      <div class="w-full h-full p-4 bg-white rounded-[0.5rem] shadow-box">
        <NuxtLink to="/account"
          ><div class="custom p-2 hover:bg-[#F2F2F2] rounded-md shadow-box">
            <v-icon class="mr-2">mdi-account-outline</v-icon>
            Account
          </div>
        </NuxtLink>
        <div class="w-full border-b-2 border-gray-100 mt-4 mb-2"></div>
        <NuxtLink to="/orders">
          <div
            class="flex justify-between custom p-2 hover:bg-[#F2F2F2] rounded-md"
          >
            <div class="flex" @click="">
              <v-icon class="mr-2">mdi-cart-check</v-icon>
              <p>Orders</p>
            </div>
            <v-icon>mdi-chevron-right</v-icon>
          </div>
        </NuxtLink>
        <div @click="signout" class="custom p-2 hover:bg-[#F2F2F2] rounded-md">
          <v-icon class="mr-2">mdi-logout</v-icon>
          <p>Sign Out</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
const user = useCookie<object | null>("user");
const token = useCookie<string | null>("token");
const signout = () => {
  user.value = null;
  token.value = null;
  window.location.href = "/";
};
</script>
<style scoped>
.custom {
  display: flex;
  cursor: pointer;
  width: 100%;
  align-items: center;
}
.shadow-box {
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
}
</style>
