import { UserDocument } from "common";
type UserAtomValue = {
    isAuthenticated: boolean;
    user: UserDocument | {};
};
export declare const userAtom: import("recoil").RecoilState<UserAtomValue>;
export declare const isAuthenticatedSelector: import("recoil").RecoilValueReadOnly<boolean>;
export {};
//# sourceMappingURL=userAtom.d.ts.map