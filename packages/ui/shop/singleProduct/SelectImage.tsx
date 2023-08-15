"use client"
import Image from "next/image"
import { Images, ProductType } from 'common'
import { useRecoilState } from "recoil"
import { selectedImageAtom } from "store"
const SelectImage = ({product}:{product:ProductType}) => {

const [selectedImage,setSelectedImage] = useRecoilState(selectedImageAtom)

  return (
    <div className='single-product-select-current-image-div border'>
         {
         product.images &&   product.images.map((image:Images,index:number)=>{
                return <Image 
                  onClick={()=>{setSelectedImage(index)}} key={index}
                  className='select-current-image'
                  height={100} width={100} 
                  src={image.url} 
                  alt='product-image'/>
        
            })
         }
        </div>
  )
}

export default SelectImage