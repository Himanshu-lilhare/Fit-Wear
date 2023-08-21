import axios from "axios";

import Link from "next/link";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { cartLength, isAuthenticatedSelector, userAtom } from "store";
import { serverLink } from "../ServerLink";
import { PiShoppingCartFill } from "react-icons/pi";
const SecondLinks = () => {
  const isAuthenticated = useRecoilValue(isAuthenticatedSelector);
  const setUser = useSetRecoilState(userAtom);
  const cart_Length = useRecoilValue(cartLength);
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
          <Link href={'/cart'} className="purple-button cart-link" style={{display:"flex",gap:"0.2rem",alignItems:"center"}}>
            <PiShoppingCartFill className="font-size-2rem" />
            <p >
              {cart_Length ? cart_Length : 0}
            </p>
          </Link>

          <Link href={"/Profile"} className="profile-link purple-button">
            Profile
          </Link>
          <button onClick={logoutHandler} className="logout-button pink-button">
            LogOut
          </button>
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
