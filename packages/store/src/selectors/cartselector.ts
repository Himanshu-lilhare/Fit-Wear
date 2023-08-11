import { selector } from "recoil";
import { cartAtom } from "../atoms/cartAtom";
import { CartItems } from "common";

export const cartTotal = selector({
  key: `cartTotal`,
  get: ({ get }) => {
    const cartItems = get(cartAtom);

    if (cartItems.length > 0) {
      const total = (cartItems as CartItems[]).reduce((acc, curr) => {
        if (curr.qty) {
          acc = acc + curr?.oneProduct?.price * curr.qty;
        }

        return acc;
      }, 0);
      return total;
    } else {
      return 0;
    }
  },
});
export const cartLength = selector({
  key: "cartLength",
  get: ({ get }) => {
    const cartItems = get(cartAtom);

    return cartItems.length;
  },
});
