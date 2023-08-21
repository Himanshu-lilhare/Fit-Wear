"use client";
import "./Navbar.css";

import { useEffect } from "react";
import { HiMenu } from "react-icons/hi";
import NavHead from "./NavHead";
import SecondLinks from "./SecondLinks";
import {  useSetRecoilState } from "recoil";
import { cartAtom, menuAtom, userAtom } from "store";
import axios from "axios";
import FirstLinks from "./FirstLinks";
import { serverLink } from "../ServerLink";
import { getCart } from "../apiCalls/cart/getCart";


export const Navbar = () => {
 const setMenu = useSetRecoilState(menuAtom);
  const setUser = useSetRecoilState(userAtom);
const setCartItems = useSetRecoilState(cartAtom)
  useEffect(() => {
    async function fetchBaby() {
      try {
        const { data } = await axios.get(`${serverLink}/getUser`, {
          withCredentials: true,
        });

        setUser({ isAuthenticated: true, user: data?.user });

        
        // const { data:data1 } = await axios.get(`${serverLink}/getCartItems`, {
        //   withCredentials: true,
        // });
        const data1 = await getCart()
        if(data1.userCart.length > 0) {
          setCartItems(data1.userCart);
        }
     
      } catch (error) {
        alert(error);
      }
    }

    fetchBaby();
  }, []);

  return (
    <nav style={{width:"100%"}} className="nav-bar">
      <div className="nav-wrapper">
        <div className="nav-head-wrapper">
          <span className="menu-icon" onClick={() => setMenu((prev) => !prev)}>
            <HiMenu fontSize={20} />
          </span>
          <NavHead />
        </div>
        <div className="nav-link-wrapper">
       
         <FirstLinks/>
          <SecondLinks />
        </div>
      </div>
    </nav>
  );
};
