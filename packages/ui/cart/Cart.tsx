"use client";
import "./cart.css";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { cartAtom, } from "store";
import axios from "axios";
import { serverLink } from "../ServerLink";
import CartItem from "./CartItem";
import { CartItems } from "common";
import CartTotal from "./CartTotal";

export const Cart = () => {
  const [cartItems, setCartItems] = useRecoilState(cartAtom);



  useEffect(() => {
    async function getCartItems() {
      try {
        const { data } = await axios.get(`${serverLink}/getCartItems`, {
          withCredentials: true,
        });

        setCartItems(data.userCart);
      } catch (error:any) {
        alert(error.response.data.message)
      }
    }

    getCartItems();
  }, []);


  if (!cartItems || cartItems.length < 1) return <h1>Cart Is Empty</h1>;

  return (
    <div className="cart-product-wrapper">
      {cartItems.map((cartItem: CartItems,index:number ) => {
        
        return (
          <CartItem
            key={cartItem._id}
            cartItemId={cartItem._id}
          />
        );
      })}
 <CartTotal/>
    </div>
  );
};
