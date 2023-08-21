import { atom, selector } from "recoil";
import { UserDocument } from "common";

type UserAtomValue = {
  isAuthenticated:boolean  
  user: UserDocument | null; // Replace 'Record<string, any>' with the type of your user object
};
export const userAtom = atom<UserAtomValue>({
  key: "userAtom",
  default: {
    isAuthenticated:false,
    user: null,
  },
});

export const isAuthenticatedSelector = selector({
    key:"isAuthentictaedSelector",
    get:({get})=>{
        let {isAuthenticated} = get(userAtom)
        return isAuthenticated
    }
})
