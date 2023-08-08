"use client";
import "./Navbar.css";
import Link from "next/link";
import {useEffect} from "react"
import { HiMenu } from "react-icons/hi";
import NavHead from "./NavHead";
import SecondLinks from "./SecondLinks";
import { useRecoilState, useSetRecoilState } from "recoil";
import { menuAtom, serverLink, userAtom } from "store";
import { useFetch } from "../hooks/useFetch";
import axios from "axios";
export const Navbar = () => {
  
  const [menu, setMenu] = useRecoilState(menuAtom);
const setUser = useSetRecoilState(userAtom)
  useEffect(() => {
    async function fetchBaby() {
      try {
        const {data} = await axios.get(`${serverLink}/getUser`,{
          withCredentials:true
        });
       
        setUser({isAuthenticated:true,user:data?.user})
        
      } catch (error) {
        alert(error)
      }
    
     
     
    
    }

    fetchBaby();
  }, []);


  return (
    <nav>
      <div className="nav-wrapper">
        <div className="nav-head-wrapper">
            
          <span className="menu-icon" onClick={()=>setMenu(prev=>!prev)}>
            <HiMenu fontSize={20}  />
          </span>
          <NavHead />
        </div>
        <div className="nav-link-wrapper">
          <div className={menu ? 'first-links first-links-d-flex' : 'first-links-d-none'  }>
            <Link href={"/"}>Home</Link>
            <Link href={"/shop"}>Shop</Link>
          </div>
          
          <SecondLinks />
        </div>
      </div>
    </nav>
  );
};
