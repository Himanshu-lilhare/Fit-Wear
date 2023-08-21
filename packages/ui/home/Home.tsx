import "./home.css";
import Image from "next/image";
import Link from "next/link";
export const Home = () => {
  return (
    <main className="home ">
      <section className="left-image-section ">
        <img src={"/heroimage.png"}  alt="djfdh" />
      </section>
      <section className="right-section ">
        <div className="right-section-content ">
        <h1 className="right-section-head">FASHION UP YOUR LOOK</h1>

<Link  href={"/shop"} className="right-section-shop-link">
  <span>
    Shop
  </span>
</Link>

<div className="right-section-2-color-divs">
  <div className="first-color-div">
     <p>
      <span> LIVE <span>FOR</span></span>
     </p>
     <p>FASHION</p>
  </div>
  <div className="second-color-div">

  </div>
</div>
        </div>
       
      </section>
    </main>
  );
};
