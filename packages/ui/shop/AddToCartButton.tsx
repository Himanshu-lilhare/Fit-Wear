"use client"


import axios from 'axios'
import { Props } from './Product'
import { useSetRecoilState } from 'recoil'
import { cartAtom } from 'store'
import { serverLink } from '../ServerLink'

const AddToCartButton = ({product}:Props) => {
const setCartItems = useSetRecoilState(cartAtom)
async function addToCart(){

const {data} = await axios.post(`${serverLink}/addToCart`,{
  productId:product._id,
  qty:1
},{
  headers:{
    "Content-Type":"application/json"
  },
  withCredentials:true
})

setCartItems(data.userCart)

}
  return (
   <button className='add-to-cart-button' onClick={addToCart}>
    ADD TO CART
   </button>
  )
}

export default AddToCartButton