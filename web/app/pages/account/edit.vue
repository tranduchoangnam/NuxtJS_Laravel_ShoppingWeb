<template>
  <div class="wrapper px-4">
    <div class="text-[2rem] pb-4 border-b-[1px] border-[#000000]">
      EDIT ACCOUNT
    </div>
    <div class="grid grid-cols-2 gap-[5%]">
      <div class="col-span-1">
        <p class="text-[1.5rem] mt-4 mb-8">Account Information</p>
        <div class="">
          <div class="w-full grid grid-cols-2 gap-4">
            <div>
              <InputDefault
                :validateFunc="validateName"
                placeholder="First Name"
                type="text"
                :submit="submit"
                :userData="auth.user!"
                @inputValue="
                  (e) => {
                    inputFirstName = e;
                    errorFirstName = validateName(e);
                  }
                "
              />
            </div>
            <div>
              <InputDefault
                :validateFunc="validateName"
                placeholder="Last Name"
                type="text"
                :submit="submit"
                :userData="auth.user!"
                @inputValue="
                  (e) => {
                    inputLastName = e;
                    errorLastName = validateName(e);
                  }
                "
              />
            </div>
          </div>
          <InputDefault
            :validateFunc="validatePhone"
            placeholder="Phone Number"
            type="text"
            :submit="submit"
            :userData="auth.user!"
            @inputValue="
              (e) => {
                inputPhone = e;
                errorPhone = validatePhone(e);
              }
            "
          />
        </div>
      </div>
      <div class="col-span-1">
        <p class="text-[1.5rem] mt-4 mb-8">Address</p>
        <InputAddress @inputValue="(e) => (inputAddress = e)" />
        {{ inputAddress }}
        {{ inputFirstName }}
        {{ inputLastName }}
        {{ inputPhone }}
      </div>
    </div>
    <div
      @click="submitForm"
      class="rounded-full bg-[#000000] text-white w-[10rem] h-[3rem] flex justify-center items-center"
    >
      <p>SAVE</p>
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
});

const auth = useAuthStore();
const token = useCookie<string | null>("token");

const submit = ref(false);

const inputFirstName = ref("");
const errorFirstName = ref("");
const inputLastName = ref("");
const errorLastName = ref("");
const inputPhone = ref("");
const errorPhone = ref("");
const inputAddress = ref("");

const validateName = (name: string) => {
  const pattern = /^[A-Za-z.'-]+$/;
  if (!pattern.test(name))
    return "Name can contain only lowercase or uppercase characters.";
  return "";
};
const validatePhone = (phone: string) => {
  const pattern =
    /^(0[1-9][0-9]{8}|0[1-9][0-9]{9}|84[1-9][0-9]{8}|84[1-9][0-9]{9})$/;
  if (!pattern.test(phone)) return "Phone number should have 10 or 11 digits.";
  return "";
};

const submitForm = async () => {
  submit.value = true;
  if (errorFirstName.value) return;
  if (errorLastName.value) return;
  if (errorPhone.value) return;
  const msg = await auth.update({
    first_name: inputFirstName.value,
    last_name: inputLastName.value,
    phone: inputPhone.value,
    address: inputAddress.value,
  });
  submit.value = false;
};
onMounted(async () => {
  auth.token = token.value;
  await auth.get();
  //   console.log(auth.token);
  //   console.log(auth.user);
  //   console.log(token.value);
});
</script>
<style scoped></style>
