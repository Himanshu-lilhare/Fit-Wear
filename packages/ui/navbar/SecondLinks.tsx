import axios from "axios";
import Link from "next/link";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { isAuthenticatedSelector, serverLink, userAtom } from "store";

const SecondLinks = () => {
  const isAuthenticated = useRecoilValue(isAuthenticatedSelector)
 const setUser = useSetRecoilState(userAtom)
async function logoutHandler(){
  try {
    const {data} = await axios.delete(`${serverLink}/logout`,{
   
      withCredentials:true
    })
    setUser({isAuthenticated:false,user:{}})


  } catch (error) {
    alert(error)
  }

 


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
