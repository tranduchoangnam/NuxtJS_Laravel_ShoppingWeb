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
          <div
            class="w-full border-input px-4 py-1 mb-4"
            @click="choose"
            placeholder="Address"
            :class="{
              'text-gray-400': !auth.user?.address,
              'text-black': auth.user?.address || finalAddress,
            }"
          >
            {{
              finalAddress
                ? finalAddress
                : auth.user?.address
                ? auth.user?.address
                : "Address"
            }}
          </div>
        </div>
      </div>
      <div class="col-span-1">
        <p class="text-[1.5rem] mt-4 mb-8">Address</p>
        <InputAddress
          :data="cities"
          type="City"
          @inputValue="
            (e) => {
              fullAddress = e.Name;
              districts = e.Districts;
            }
          "
        />
        <InputAddress
          :data="districts"
          type="District"
          @inputValue="
            (e) => {
              fullAddress = e.Name + ', ' + fullAddress;
              wards = e.Wards;
            }
          "
        />
        <InputAddress
          :data="wards"
          type="Ward"
          @inputValue="
            (e) => {
              fullAddress = e.Name + ', ' + fullAddress;
            }
          "
        />
        <input
          class="w-full border-input px-4 py-1 mb-4"
          placeholder="Address"
          v-model="inputAddress"
        />
      </div>
    </div>
    <div
      @click="submitForm"
      class="rounded-full bg-[#000000] text-white w-[10rem] h-[3rem] flex justify-center items-center"
    >
      <p>SAVE</p>
    </div>
    <SuccessNoti v-if="message[7] === 's'" :message="message" />
    <ErrorNoti v-if="message[7] === 'f'" :message="message" />
  </div>
</template>
<script setup lang="ts">
import axios from "axios";
import { useAuthStore } from "@/store/auth";
import SuccessNoti from "@/components/notification/SuccessNoti.vue";
import ErrorNoti from "~/components/notification/ErrorNoti.vue";
import { City, District, Ward } from "@/utils/types";
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
const fullAddress = ref("");
const inputAddress = ref("");
const message = ref("");

const cities = ref<City[]>([]);
const districts = ref<District[]>([]);
const wards = ref<Ward[]>([]);

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
  const res = await auth.update({
    first_name: inputFirstName.value,
    last_name: inputLastName.value,
    phone: inputPhone.value,
    address: finalAddress.value,
  });
  console.log(res);
  if (res.status === 200) message.value = "Update successfully";
  else message.value = "Update failed";
  setTimeout(() => {
    message.value = "";
  }, 3000);

  submit.value = false;
};

const finalAddress = computed(() => {
  const separate = inputAddress.value ? ", " : "";
  return inputAddress.value + separate + fullAddress.value;
});

onMounted(async () => {
  auth.token = token.value;
  await auth.get();
  try {
    const res = await axios.get("/db.address.json");
    cities.value = res.data;
  } catch (e) {
    console.log(e);
  }
});

const choose = () => {
  const target = document.getElementById("choose-city");
  console.log(target);
  if (target) target.focus();
};
</script>
<style scoped></style>
