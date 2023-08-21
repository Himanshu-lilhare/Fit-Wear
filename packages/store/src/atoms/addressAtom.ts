import { atom } from "recoil";

type TAddress = {
   
        street: string;
        city: string;
        state: string;
        zip: string;
    
}

export const addressAtom = atom<null | TAddress >({
    key:"addressAtom",
    default:null
})