import React from 'react'
import {cookies} from "next/headers"
export const AllProducts = async() => {

    let data = await fetch("http://localhost:5001/getProducts",{
        method:"GET",
        headers:{
            "Authorization" :`Bearer ${cookies().get("fit_wear_token")?.value}`
        }
    })
    const {products} = await data.json()
    console.log(products)
    

  return (

    <div>AllProducts</div>
  )
}

