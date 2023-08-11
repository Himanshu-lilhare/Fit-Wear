import { CartItems } from "common";
import { atom, atomFamily, selector } from "recoil";

export const cartAtom = atom<CartItems[]|[]>({
  key: "cartAtom",
  default: [],
});


