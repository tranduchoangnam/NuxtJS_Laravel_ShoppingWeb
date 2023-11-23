import { set } from "lodash";
import { defineStore } from "pinia";
import axios from "~/libs/axios";
import { getCookie, removeCookie } from "~/utils/cookies";
export interface User {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  email_verified_at: string | null;
  address: string | null;
  phone: string | null;
  created_at: Date;
  updated_at: Date;
}
export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: null as User | null,
    token: getCookie("token") as string | null,
  }),

  actions: {
    async get() {
      try {
        // console.log("token", this.token);
        const auth = await axios.get(
          "http://exchange.shop.local:8000/api/api/auth",
          {
            headers: { Authorization: `Bearer ${this.token}` },
          }
        );
        this.user = auth.data.user;
        this.token = auth.data.token;
        // console.log("auth", auth.data);
      } catch (error) {
        console.log("error", error);
        throw error;
      }
    },
    async update(data: {
      first_name: string;
      last_name: string;
      address: string;
      phone: string;
    }) {
      try {
        const auth = await axios.post(
          "http://exchange.shop.local:8000/api/api/user/update",
          data,
          {
            headers: { Authorization: `Bearer ${this.token}` },
          }
        );
        this.user = auth.data.user;
        this.token = auth.data.token;
        return auth;
      } catch (error: any) {
        console.log("error", error);
        return error.response;
      }
    },
    async signin(email: string, password: string) {
      try {
        const auth = await axios.post(
          "http://exchange.shop.local:8000/api/api/auth/signin",
          { email, password }
        );
        this.user = auth.data.user;
        this.token = auth.data.token;
        setCookie("token", auth.data.token);
      } catch (error: any) {
        console.log("error", error);
        throw error;
      }
    },
    async signout() {
      try {
        const auth = await axios.get(
          "http://exchange.shop.local:8000/api/api/auth/signout",
          {
            headers: { Authorization: `Bearer ${this.token}` },
          }
        );
        this.user = null;
        this.token = null;
        removeCookie("token");
        console.log("auth", auth);
      } catch (error) {
        console.log("error", error);
        throw error;
      }
    },
  },
});
