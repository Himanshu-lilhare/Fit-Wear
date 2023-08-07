import Link from "next/link";
import { useRecoilValue } from "recoil";
import { isAuthenticatedSelector } from "store";

const SecondLinks = () => {
  const isAuthenticated = useRecoilValue(isAuthenticatedSelector)

function logoutHandler(){
  
}
  return (
    <div className="second-links">
      { isAuthenticated ? (
        <>
          <Link href={"/cart"}>Cart</Link>
          <Link href={"/Profile"} className="profile-link">
            Profile
          </Link>
          <button onClick={logoutHandler}>
            LogOut
          </button>
        </>
      ) : (
        <>
          <Link href={"/login"}>LogIn</Link>
          <Link href={"/signup"}>
            SignUp
          </Link>
        </>
      )}
    </div>
  );
};

export default SecondLinks;
