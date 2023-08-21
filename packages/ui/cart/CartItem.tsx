"use client";
import axios from "axios";
import { CartItems } from "common";
import { ChangeEvent, useEffect } from "react";
import { useSetRecoilState } from "recoil";
import { cartAtom } from "store";
import { serverLink } from "../ServerLink";
import useDebounce from "../hooks/useDebounce";
import { useState } from "react";
import Image from "next/image";
const CartItem = ({ cartItem }: { cartItem: CartItems }) => {
  if (!cartItem.qty) return <></>;
  const setCartItems = useSetRecoilState(cartAtom);
  const debounceQty = useDebounce(cartItem.qty, 500);
  const [blocker, setBlocker] = useState(0);

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    if (!e.target.value) {
      console.log("yaha aaya delete karne");
      return deleteHandler();
    }
    setCartItems((prev) => {
      let newCartItems = prev.map((item, index) => {
        if (item._id === cartItem._id) {
          return { ...item, qty: parseInt(e.target.value) };
        }
        return item;
      });
      return newCartItems;
    });
  }
  useEffect(() => {
    setBlocker(blocker + 2);
    async function setCart() {
      const { data } = await axios.post(
        `${serverLink}/addToCart`,
        {
          productId: cartItem.oneProduct._id,
          qty: debounceQty,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
    }

    if (debounceQty && blocker > 1) {
      setCart();
    }
  }, [debounceQty]);

  async function deleteHandler() {
    setCartItems((prev) => {
      let newCartItems = prev.filter((item) => {
        return item._id !== cartItem._id;
      });
      return newCartItems;
    });

    await axios.delete(
      `${serverLink}/deleteFromCart?productId=${cartItem.oneProduct._id}`,
      {
        withCredentials: true,
      }
    );
  }
  return (
    <div className="cart-product">
      <div className="cart-product-image-name-and-input">
        <Image
          className="cart-product-image"
          height={70}
          width={70}
          src={
            cartItem.oneProduct.images
              ? cartItem.oneProduct.images[0].url
              : "dfdf"
          }
          alt="cartProductImae"
        />
        <div>
          <h1>{cartItem?.oneProduct?.name}</h1>
          <input
            className="cart-product-qty-input"
            type="number"
            value={cartItem?.qty}
            min={1}
            onChange={handleChange}
          />
        </div>
      </div>

      <div></div>
      <div className="cart-product-price-and-delete">
        <p style={{fontSize:"1.5rem",fontWeight:'600'}}> Price : {cartItem?.oneProduct?.price}</p>

        <button  onClick={deleteHandler} className="cart-product-delete-button purple-button">Delete</button>
      </div>
    </div>
  );
};

export default CartItem;
