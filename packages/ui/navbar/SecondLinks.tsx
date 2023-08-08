import axios from "axios";
import { UserDocument } from "common";
import Link from "next/link";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { cartAtom, isAuthenticatedSelector, userAtom, userValueSelector } from "store";
import { serverLink } from "../ServerLink";

const SecondLinks = () => {
  const isAuthenticated = useRecoilValue(isAuthenticatedSelector);
  const setUser = useSetRecoilState(userAtom);
  const cart = useRecoilValue(cartAtom)
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
           cart?.length
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
