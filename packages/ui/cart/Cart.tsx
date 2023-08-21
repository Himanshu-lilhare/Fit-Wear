"use client";
import "./cart.css";
import Link from "next/link";
import { useRecoilState } from "recoil";
import { cartAtom } from "store";

import CartItem from "./CartItem";
import { CartItems } from "common";
import CartTotal from "./CartTotal";

export const Cart = () => {
  const [cartItems, setCartItems] = useRecoilState(cartAtom);

  if (!cartItems || cartItems.length < 1) return <h1>Cart Is Empty</h1>;

  return (
    <>
      <div className="cart-product-wrapper">
        {cartItems.map((cartItem: CartItems, index: number) => {
          return <CartItem key={index} cartItem={cartItem} />;
        })}
      </div>
      <CartTotal />
      <div className="checkout-link-div">
        <Link className="checkout-link" href={"/checkout"}>
          Checkout
        </Link>
      </div>
    </>
  );
};
