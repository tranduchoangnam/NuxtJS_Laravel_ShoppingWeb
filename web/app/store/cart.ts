import { defineStore } from "pinia";
export const useCartStore = defineStore("cart", {
  state: () => ({
    list: [] as any,
    total: 0,
  }),
  actions: {
    addToCart(e: Object, color: Number, size: Number) {
      var chosen: any = {};
      chosen.chosenColor = color;
      chosen.chosenSize = size;
      chosen.product = e;

      const cart: Array<any> = JSON.parse(localStorage.getItem("cart") || "[]");
      var existed = false;
      for (let i = 0; i < cart.length; i++) {
        if (
          cart[i].product.id == chosen.product.id &&
          cart[i].chosenColor == chosen.chosenColor &&
          cart[i].chosenSize == chosen.chosenSize
        ) {
          cart[i].quantity += 1;
          existed = true;
        }
      }
      if (!existed) {
        chosen.quantity = 1;
        cart.push(chosen);
      }
      this.total += 1;
      // Push the new item to the cart
      // Store the updated cart back to localStorage
      localStorage.setItem("cart", JSON.stringify(cart));
      this.list = cart;
    },
    removeFromCart(e: Object, color: Number, size: Number) {
      var chosen: any = {};
      chosen.chosenColor = color;
      chosen.chosenSize = size;
      chosen.product = e;

      const cart: Array<any> = JSON.parse(localStorage.getItem("cart") || "[]");
      for (let i = 0; i < cart.length; i++) {
        if (
          cart[i].product.id == chosen.product.id &&
          cart[i].chosenColor == chosen.chosenColor &&
          cart[i].chosenSize == chosen.chosenSize
        ) {
          if (cart[i].quantity > 1) {
            cart[i].quantity -= 1;
          } else {
            cart.splice(i, 1);
          }
          this.total -= 1;
        }
      }
      // Push the new item to the cart
      // Store the updated cart back to localStorage
      localStorage.setItem("cart", JSON.stringify(cart));
      this.list = cart;
    },

    getCart() {
      try {
        const cart: Array<Object> = JSON.parse(
          localStorage.getItem("cart") || "[]"
        );
        this.list = cart;
        this.total = this.list.reduce(
          (total: number, item: any) => total + item.quantity,
          0
        );
      } catch (e) {
        throw e;
      }
    },

    removeCart() {
      try {
        localStorage.removeItem("cart");
        this.list = [];
        this.total = 0;
      } catch (e) {
        throw e;
      }
    },
  },
});
