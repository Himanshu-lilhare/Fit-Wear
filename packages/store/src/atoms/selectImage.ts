import { atom } from "recoil";

export const selectedImageAtom = atom<number>({
    key:"selectedImageAtom",
    default:0
})