import { defineStore } from "pinia";
import axios from "~/libs/axios";

interface User {
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
    token: null as string | null,
  }),

  actions: {
    async get() {
      try {
        const auth = await axios.get(
          "http://exchange.shop.local:8000/api/api/auth",
          {
            headers: { Authorization: `Bearer ${this.token}` },
          }
        );
        this.user = auth.data.user;
        this.token = auth.data.token;
      } catch (error) {
        console.log("error", error);
        throw error;
      }
    },
  },
});
