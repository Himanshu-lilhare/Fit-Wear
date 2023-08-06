import React from 'react'

export const AllProducts = async() => {

    let data = await fetch("http://localhost:5001/getProducts")
    const {products} = await data.json()
    console.log(products)
    

  return (

    <div>AllProducts</div>
  )
}

