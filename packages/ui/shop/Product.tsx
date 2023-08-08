import { ProductType } from "common";
import AddToCartButton from "./AddToCartButton";

export type Props = {
  product: ProductType;
};

const Product = ({ product }: Props) => {
  return (
    <div className="product-div border">
      <h2 className="product-name">{product.name}</h2>
      <p className="product-price">{product.price}</p>
      <p className="product-ratings">Ratings : {product.ratings}</p>
      <AddToCartButton product={product}/>
    </div>
  );
};

export default Product;
