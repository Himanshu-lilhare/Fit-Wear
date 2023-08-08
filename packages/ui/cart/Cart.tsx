"use client"
import React from 'react'
import { useRecoilValue } from 'recoil'
import { cartAtom } from 'store'
import CartProduct from './CartProduct'

export const Cart = () => {
    const cart = useRecoilValue(cartAtom)
   
    console.log(cart)

  if(!cart || cart.length < 1) return <h1>Cart Is Empty</h1>
  return (
    <div className='cart-product-wrapper'>
         {
           cart && cart.map((cartProduct)=>{
return <CartProduct cartProduct={cartProduct}/>
            })
         }
    </div>
  )
}

