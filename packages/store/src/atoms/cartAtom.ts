import {  CartItems} from "common";
import { atom, atomFamily, selector,} from "recoil";

export const cartAtom = atom<CartItems[]>({
  key: "cartAtom",
  default: [],
});

export const cartItemFamily = atomFamily<CartItems,string>({
  key:`cartItematomFamily`,
  default:(id)=>{
   return selector({
    key:`cartItemSelector${Math.random()}`,
    get:({get})=>{
       console.log(id + "id in family")
       const cartItems = get(cartAtom)
       let item = cartItems.find(item=>item._id===id)
       console.log(item?._id + " in the family")
    
       return item
    }
  })
}
}) 


