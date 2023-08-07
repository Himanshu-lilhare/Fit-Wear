import { atom } from "recoil";


export const userAtom = atom({
    key:"userAtom",
    default : {
        isAUthencate:false,
        loading:false,
        user:{},
        error:""
    }
})