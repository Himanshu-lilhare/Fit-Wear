import {Home} from "ui"
import { cookies } from "next/headers"
export default function Page() {
 console.log(cookies().get("token").value+" ye rahi cookie")
  return (
    <>
     
 <Home/>
    </>
  );
}
