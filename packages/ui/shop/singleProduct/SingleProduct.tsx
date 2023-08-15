// "use client"
import { ProductType } from "common";
import CurrentImage from "./CurrentImage";
import "./singleproduct.css";

import SelectImage from "./SelectImage";
import AddToCartButton from "../AddToCartButton";
export const SingleProduct = ({ product }: { product: ProductType }) => {
  return (
    <div className="single-product border">
      <section className="single-product-image-section">
        <CurrentImage product={product} />
        <SelectImage product={product} />
      </section>
      <section className="single-product-details-section">
        <h1 className="product-detail-name">{product.name}</h1>
        <p className="product-detail-desc">{product.description}</p>
        <p className="product-detail-price">Price : {product.price}</p>
        <p className="product-detail-stock">Available : {product.stock}</p>
        <p className="product-detail-seller">Seller : {product.seller}</p>
        <div>
       <AddToCartButton product={product}/>
        </div>
        <div className="product-detail-reviews">
          <h1 className="product-detail-review-head">Reviews</h1>
          {product.reviews?.length ? (
            product.reviews.map((review) => {
              return <p className="product-detail-review">{review.comment}</p>;
            })
          ) : (
            <h3>No Reviews Yet</h3>
          )}
        </div>
      </section>
    </div>
  );
};
