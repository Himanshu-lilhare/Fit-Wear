import { ProductType } from 'common'
import React from 'react'

const CartProduct = ({cartProduct}:{cartProduct:ProductType}) => {

  return (
    <div className='cart-product'>
        <h1>
            {
                cartProduct.name
            }
        </h1>
        <input type="number" value={cartProduct.price} />
        <button>click</button>
      
    </div>
  )
}

export default CartProduct