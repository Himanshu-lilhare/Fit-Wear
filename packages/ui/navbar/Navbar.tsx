"use client";
import "./Navbar.css";
import Link from "next/link";

import { HiMenu } from "react-icons/hi";
import NavHead from "./NavHead";
import SecondLinks from "./SecondLinks";
import { useRecoilState } from "recoil";
import { menuAtom } from "store";
export const Navbar = () => {
  const [menu, setMenu] = useRecoilState(menuAtom);

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
          <div className={menu ? 'first-links first-links-d-flex' : 'first-links first-links-d-none'  }>
            <Link href={"/"}>Home</Link>
            <Link href={"/shop"}>Shop</Link>
          </div>
          <SecondLinks />
        </div>
      </div>
    </nav>
  );
};
