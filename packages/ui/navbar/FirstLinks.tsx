"use client"
import Link from "next/link";
import { useRecoilValue } from 'recoil';
import { menuSelector } from 'store';
const FirstLinks = () => {
    const menu = useRecoilValue(menuSelector)
  return (
    <div
    className={
      menu ? "first-links first-links-d-flex" : "first-links-d-none"
    }
  >
    <Link href={"/"}>Home</Link>
    <Link href={"/shop"}>Shop</Link>
  </div>
  )
}

export default FirstLinks