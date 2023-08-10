
import { CartItems } from 'common'
import React from 'react'
import { useRecoilValue } from 'recoil'
import { cartAtom, cartItemFamily } from 'store'

const CartTotal = () => {
const cartItems = useRecoilValue(cartAtom)
let cartTotalArray = cartItems.map((item:CartItems)=>{
    const itemFamily = useRecoilValue(cartItemFamily(item._id))
    return itemFamily?.qty ? itemFamily.qty * itemFamily.oneProduct.price : 0
})
let cartTotal = cartTotalArray.reduce((acc,curr)=>acc+curr,0)



  return (
    <div>
    <h1>Total : {cartTotal  && cartTotal} </h1>
  </div>
  )
}

export default CartTotal