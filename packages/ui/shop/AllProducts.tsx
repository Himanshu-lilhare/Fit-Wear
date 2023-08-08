import { cookies } from "next/headers";
import { serverLink } from "../ServerLink";
import axios from "axios";
import Product from "./Product";
import "./shop.css"
async function getAllProducts() {
  try {
    let { data } = await axios.get(`${serverLink}/getProducts`, {
      headers: {
        Authorization: `${cookies().get("fit_wear_token")?.value}`,
      },
      withCredentials: true,
    });

    return data?.products;
  } catch (error: any) {
    console.log(error?.response?.data?.error);
  }
}

export const AllProducts = async () => {
  const products = await getAllProducts();

  return <main className="products-div">
    {
      products.length > 0 ? products.map((product:any)=>{
        return <Product product={product}/>
       
      }) : <><h1>No Products</h1></>
    }
  </main>;
};
