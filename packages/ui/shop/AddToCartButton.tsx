"use client"

import React from 'react'
import { Props } from './Product'
import { useSetRecoilState } from 'recoil'
import { cartAtom } from 'store'

const AddToCartButton = ({product}:Props) => {
const setCart = useSetRecoilState(cartAtom)
function addToCart(){

setCart((prev)=>{
const updatedProducts = [...prev,product]
return updatedProducts
})

}
  return (
   <button onClick={addToCart}>
    ADD TO CART
   </button>
  )
}

export default AddToCartButton