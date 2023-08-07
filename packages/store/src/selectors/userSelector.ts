import { selector } from "recoil";
import { userAtom } from "../atoms/userAtom";

export const userAuthenticate = selector({
    key:"userAuthenticate",
    get:({get})=>{
        const {isAUthencate} = get(userAtom)

        return isAUthencate
    }
})

export const loginLoading = selector({
    key:"loginLoading",
    get:({get})=>{
        const {loading} = get(userAtom)

        return loading
    }
})

export const loginError = selector({
    key:"loginLoading",
    get:({get})=>{
        const {error} = get(userAtom)

        return error
    }
})