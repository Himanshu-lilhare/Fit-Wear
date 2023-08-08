import { selector } from "recoil";
import { userAtom } from "../atoms/userAtom";


export const userValueSelector = selector({
    key:'userValueSelector',
    get:({get})=>{
        const {user} = get(userAtom)
        return user
    }
})






