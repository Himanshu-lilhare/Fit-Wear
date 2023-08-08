import { atom , RecoilState, selector } from "recoil";

export const menuAtom : RecoilState<boolean> = atom({
    key:'menuAtom',
  default:false
})

export const menuSelector = selector({
  key:"menuSelector",
  get:({get})=>{
    const menu = get(menuAtom)
    return menu
  }
})
