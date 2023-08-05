import { atom , RecoilState } from "recoil";

export const menuAtom : RecoilState<boolean> = atom({
    key:'menuAtom',
  default:false
})
