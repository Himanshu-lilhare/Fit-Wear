import { ProductType } from "common";
import { atom } from "recoil";


type CartAtomType = Array<ProductType> | []
export const cartAtom=atom<CartAtomType>({
    key:"cartAtom",
    default:[]
})