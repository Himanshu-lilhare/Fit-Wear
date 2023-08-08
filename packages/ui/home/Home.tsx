import "./home.css"
import Image from "next/image"

export const Home = () => {
  
  return (
    <main className="home">

<div className="main-wrapper border">

<aside className="main-wrapper-left-aside border">
<Image alt="main-imagee-1" src={"https://res.cloudinary.com/dtjpdqgb6/image/upload/v1691243957/image1_btpgft.png"}
   height="570"
   width='362'
  
   objectFit="cover"
   priority={true}
/>
</aside>
<div className="main-wrapper-center border">

</div>
<aside className="main-wrapper-right-aside border">
<Image alt="main-imagee-1" src={"https://res.cloudinary.com/dtjpdqgb6/image/upload/v1691244760/image2_emmqos.png"}
   height="568"
   width='249'

   objectFit="cover"
   objectPosition="bottom 50%"
   priority={true}
   
/>
</aside>

</div>

    </main>
  )
}

