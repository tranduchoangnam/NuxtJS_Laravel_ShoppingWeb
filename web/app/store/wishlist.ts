import { defineStore } from "pinia";
export const useWishlistStore = defineStore("wishlist", {
  state: () => ({
    list: [] as any,
  }),
  actions: {
    addToWishlist(product: any) {
      const wishlist: Array<any> = JSON.parse(
        localStorage.getItem("wishlist") || "[]"
      );
      wishlist.push(product);
      // Push the new item to the Wishlist
      // Store the updated Wishlist back to localStorage
      localStorage.setItem("wishlist", JSON.stringify(wishlist));
      this.list = wishlist;
    },
    removeFromWishlist(product: any) {
      const wishlist: Array<any> = JSON.parse(
        localStorage.getItem("wishlist") || "[]"
      );
      for (let i = 0; i < wishlist.length; i++) {
        if (wishlist[i].id === product.id) {
          wishlist.splice(i, 1);
        }
      }
      console.log("wishlist", wishlist);
      // Push the new item to the Wishlist
      // Store the updated Wishlist back to localStorage
      localStorage.setItem("wishlist", JSON.stringify(wishlist));
      this.list = wishlist;
    },

    getWishlist() {
      try {
        const wishlist: Array<Object> = JSON.parse(
          localStorage.getItem("wishlist") || "[]"
        );
        this.list = wishlist;
      } catch (e) {
        throw e;
      }
    },

    checkIfExist(product: any) {
      const wishlist: Array<any> = JSON.parse(
        localStorage.getItem("wishlist") || "[]"
      );
      for (let i = 0; i < wishlist.length; i++) {
        if (wishlist[i].id === product.id) {
          return true;
        }
      }
      return false;
    },
  },
});
