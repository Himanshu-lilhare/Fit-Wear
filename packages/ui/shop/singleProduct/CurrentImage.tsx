"use client"
import { ProductType } from "common"
import Image from "next/image"
import { useRecoilValue } from "recoil"
import { selectedImageAtom } from "store"
const CurrentImage = ({product}:{product:ProductType}) => {
  
    const selectedImage:number = useRecoilValue(selectedImageAtom)

  return (
    <div className='single-product-current-image-div border'>
          
    <Image className='current-image' style={{objectFit:"contain"}} height={400} width={400} src={product.images ? product.images[selectedImage].url : "kfgdjgyyh" } alt='product-image'/>
    </div>
  )
}

export default CurrentImage