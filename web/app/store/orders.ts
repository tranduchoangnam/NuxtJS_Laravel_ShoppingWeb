import { defineStore } from "pinia";
export const useOrdersStore = defineStore("orders", {
  state: () => ({
    list: [] as any,
    currentOrder: null as any,
  }),
  actions: {
    addToOrders(cart: Array<any> | null, product: Object | null) {
      const orders: Array<any> = JSON.parse(
        localStorage.getItem("orders") || "[]"
      );
      var chosen: any = {};
      chosen.date = new Date(Date.now());
      chosen.status = "Awaiting Payment";
      if (cart) {
        chosen.products = cart;
        orders.push(chosen);
      } else {
        chosen.products = [product];
        orders.push(chosen);
      }
      // Push the new item to the orders
      // Store the updated orders back to localStorage
      localStorage.setItem("orders", JSON.stringify(orders));
      this.list = orders;
    },

    getOrders() {
      try {
        const orders: Array<Object> = JSON.parse(
          localStorage.getItem("orders") || "[]"
        );
        this.list = orders;
      } catch (e) {
        throw e;
      }
    },

    removeOrders() {
      try {
        localStorage.removeItem("orders");
        this.list = [];
      } catch (e) {
        throw e;
      }
    },
  },
});
