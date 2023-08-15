import React from 'react'
import { SingleProduct, serverLink } from 'ui'
const getSingleProduct = async(id:string)=>{

try {
    const res = await fetch(`${serverLink}/product/${id}`)

    let product = await res.json()
    return product.product
} catch (error) {
    console.log(error)
}

}

const ProductDetail =async ({params}) => {
  

  const singleProducct = await getSingleProduct(params.id) 
 
  return (
    <main className='pad'> 
    <SingleProduct product={singleProducct}/>
    </main>
  )
}

export default ProductDetail