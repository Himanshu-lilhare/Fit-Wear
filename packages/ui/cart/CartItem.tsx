"use client";
import axios from "axios";
import { CartItems } from "common";
import { ChangeEvent } from "react";
import { useSetRecoilState } from "recoil";
import { cartAtom } from "store";
import { serverLink } from "../ServerLink";
import { debounce } from "lodash";

const CartItem = ({ cartItem }: { cartItem: CartItems }) => {
  if (!cartItem.qty) return <></>;
  const setCartItems = useSetRecoilState(cartAtom);

const debounseApiCall = debounce(async(qty:number)=>{

const {data} = await axios.post(`${serverLink}/addToCart`,{
  productId:cartItem.oneProduct._id,
  qty
},{
  headers:{
    "Content-Type":"application/json"
  },
  withCredentials:true
})

setCartItems(data.userCart)

},500)

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

    debounseApiCall(parseInt(e.target.value))

    

  }

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
      <h1>{cartItem?.oneProduct?.name}</h1>
      <p> Price : {cartItem?.oneProduct?.price}</p>

      <input
        className="qty-input"
        type="number"
        value={cartItem?.qty}
        min={1}
        onChange={handleChange}
      />

      <button onClick={deleteHandler}>Delete</button>
    </div>
  );
};

export default CartItem;
