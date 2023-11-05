<template>
  <div class="w-[30rem] text-[1.3rem]">
    <div class="flex flex-col justify-center items-center">
      <img
        class="mb-16 w-[6rem]"
        src="https://cdn.boo.vn/media/logo/stores/1/logo.png"
      />
      <input
        class="w-full px-4 py-1"
        :class="errorEmail ? 'border-error' : 'border-input'"
        type="text"
        placeholder="Email"
        v-model="inputEmail"
      />
      <div class="text-[0.9rem] text-red mb-4">
        {{ errorEmail }}
      </div>
      <input
        class="w-full px-4 py-1"
        :class="errorPassword ? 'border-error' : 'border-input'"
        type="password"
        placeholder="Password"
        v-model="inputPassword"
      />
      <div class="right-[-10rem] text-[0.9rem] text-red mb-4">
        {{ errorPassword }}
      </div>
      <ButtonRounded @click="submitForm" bgColor="#000000" textColor="#FFFFFF">
        <template #name>
          <p>SIGN IN</p>
          <ButtonLoading v-if="loading" />
        </template>
      </ButtonRounded>
      <NuxtLink to="/auth/forgot-password" class="mt-4"
        >Forgot password</NuxtLink
      >
      <div class="flex">
        <p>Don't have an account?</p>
        <NuxtLink to="/auth/signup" class="font-bold ml-2 text-red-400"
          >Sign up</NuxtLink
        >
      </div>
      <div class="flex w-full my-8">
        <div class="w-full grid grid-rows-2">
          <div class="border-b-[1px] border-[#000000]"></div>
          <div></div>
        </div>
        <div class="mx-2">Or</div>
        <div class="w-full grid grid-rows-2">
          <div class="border-b-[1px] border-[#000000]"></div>
          <div></div>
        </div>
      </div>
      <div
        v-for="(item, index) in social"
        :key="index"
        class="flex w-full py-1 my-1 items-center cursor-pointer justify-center border-input text-[1rem] text-grey"
      >
        <img class="h-[1rem] mr-2" :src="item.icon" />
        <p>Sign in with {{ item.name }}</p>
      </div>
    </div>
    <ErrorNoti v-if="message" :message="message" />
  </div>
</template>
<script setup lang="ts">
import axios from "axios";
import Google from "~/static/google.png";
import Facebook from "~/static/facebook.png";
import ErrorNoti from "../notification/ErrorNoti.vue";
import { useAuthStore } from "~/store/auth";
const token = useCookie<string | null>("token");
const auth = useAuthStore();
const social = [
  {
    name: "Google",
    icon: Google,
  },
  {
    name: "Facebook",
    icon: Facebook,
  },
];
const loading = ref(false);
const message = ref("");
const inputEmail = ref("");
const errorEmail = ref("");

const inputPassword = ref("");
const errorPassword = ref("");

watch(inputEmail, (input) => {
  const pattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
  if (!pattern.test(input)) {
    errorEmail.value = "Email is invalid";
  } else {
    errorEmail.value = "";
  }
});
watch(inputPassword, (input) => {
  const pattern =
    /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  if (!pattern.test(input)) {
    errorPassword.value =
      "Password must contain at least 8 characters, 1 uppercase, 1 digit and 1 special character";
  } else {
    errorPassword.value = "";
  }
});
const submitForm = async () => {
  if (inputEmail.value === "") errorEmail.value = "Email is required";
  if (inputPassword.value === "") errorPassword.value = "Password is required";
  if (errorEmail.value === "" && errorPassword.value === "") {
    loading.value = true;
    try {
      const response = await axios.post(
        "http://exchange.shop.local:8000/api/api/auth/signin",
        {
          email: inputEmail.value,
          password: inputPassword.value,
        }
      );
      loading.value = false;
      console.log(response.data.token);
      auth.user = response.data.user;
      console.log(auth.user);
      token.value = response.data.token;
      axios.defaults.headers.common["Authorization"] = `Bearer ${token.value}`;
      await navigateTo("/");
    } catch (error: any) {
      loading.value = false;
      message.value = error.response.data;
    }
  } else return;
};
</script>
<style>
input:focus {
  outline: none;
}
.border-input {
  border: 1px solid black;
}
.border-error {
  border: 1px solid red;
}
</style>
