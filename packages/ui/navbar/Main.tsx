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
        setCartItems(data?.user?.cart)
      } catch (error) {
        alert(error);
      }
    }

    fetchBaby();
  }, []);

  return (
    <nav>
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
