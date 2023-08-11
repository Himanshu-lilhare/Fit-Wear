import axios from "axios";
import { UserDocument } from "common";
import Link from "next/link";
import { useRecoilValue, useSetRecoilState } from "recoil";
import {  cartLength, isAuthenticatedSelector, userAtom } from "store";
import { serverLink } from "../ServerLink";

const SecondLinks = () => {
  const isAuthenticated = useRecoilValue(isAuthenticatedSelector);
  const setUser = useSetRecoilState(userAtom);
  const cart_Length = useRecoilValue(cartLength)
  async function logoutHandler() {
    try {
      const { data } = await axios.delete(`${serverLink}/logout`, {
        withCredentials: true,
      });
      setUser({ isAuthenticated: false, user: {} });
    } catch (error) {
      alert(error);
    }
  }

  return (
    <div className="second-links">
      {isAuthenticated ? (
        <>
          <Link href={"/cart"}>Cart ({
         cart_Length
          })</Link>
          <Link href={"/Profile"} className="profile-link">
            Profile
          </Link>
          <button onClick={logoutHandler}>LogOut</button>
        </>
      ) : (
        <>
          <Link href={"/login"}>LogIn</Link>
          <Link href={"/signup"}>SignUp</Link>
        </>
      )}
    </div>
  );
};

export default SecondLinks;
