"use client"
import { CartItems } from "common";
import { ChangeEvent } from "react";
import { useRecoilState } from "recoil";
import { cartItemFamily } from "store";

const CartItem = ({ cartItemId }: { cartItemId: string }) => {
console.log(cartItemId+ ' in cartItem cmponent')
  const [item,setItem] = useRecoilState(cartItemFamily(cartItemId))

  function handleChange(e:ChangeEvent<HTMLInputElement>){
   if(isNaN(parseInt(e.target.value))){
console.log("is nana hai")
   }
 let qty = parseInt(e.target.value)
 if(item?.qty && item.oneProduct && item){

  setItem((prev:CartItems)=>{
    return {...prev,qty}!
   })
 }


  }

  // if(!(item as CartItems).oneProduct) return <h1>No Product</h1>
 
  return (
    <div className="cart-product">
      <h1>{(item as CartItems).oneProduct.name}</h1>
      <p> Price : {(item as CartItems).oneProduct.price}</p>
      <button className="qty-button">-</button>
      <input type="number" value={item?.qty} min={1} onChange={handleChange} />
      <button className="qty-button">+</button>
    </div>
  );
};

export default CartItem;
