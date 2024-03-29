<template>
  <div class="w-[30rem] text-[1.3rem]">
    <div class="flex flex-col justify-center items-center">
      <img
        class="mb-16 w-[6rem]"
        src="https://cdn.boo.vn/media/logo/stores/1/logo.png"
      />

      <InputDefault
        :validateFunc="validateEmail"
        placeholder="Email"
        type="text"
        :submit="submit"
        @inputValue="
          (e) => {
            inputEmail = e;
            errorEmail = validateEmail(e);
          }
        "
      />
      <InputDefault
        :validateFunc="validatePassword"
        placeholder="Password"
        type="password"
        :submit="submit"
        @inputValue="
          (e) => {
            inputPassword = e;
            errorPassword = validatePassword(e);
          }
        "
      />
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
import { useAuthStore } from "~/store/auth";
import { setCookie } from "~/utils/cookies";
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

const submit = ref(false);

const validateEmail = (input: string) => {
  const pattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
  if (!pattern.test(input)) return "Email is invalid";
  return "";
};
const validatePassword = (input: string) => {
  const pattern =
    /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  if (!pattern.test(input))
    return "Password must contain at least 8 characters, 1 uppercase, 1 digit and 1 special character";
  return "";
};

const submitForm = async () => {
  submit.value = true;
  if (inputEmail.value === "" || inputPassword.value === "") {
    return;
  }
  if (errorEmail.value === "" && errorPassword.value === "") {
    loading.value = true;
    try {
      await auth.signin(inputEmail.value, inputPassword.value);
      loading.value = false;
      submit.value = false;

      await navigateTo("/");
    } catch (error: any) {
      loading.value = false;
      submit.value = false;
      message.value = error.response.data;
    }
  } else {
    submit.value = false;
    return;
  }
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
