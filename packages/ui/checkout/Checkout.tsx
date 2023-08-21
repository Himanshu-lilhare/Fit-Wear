"use client";
import "./checkout.css";
import { useRecoilValue } from "recoil";
import { cartAtom } from "store";
import { CheckoutAddress } from "./CheckoutAddress";
import { CheckoutFooter } from "./CheckoutFooter";

const demoAddress = [
  {
    street: "456 Elm Avenue",
    city: "Sample Town",
    state: "Sample State",
    zip: "67890",
  },
  {
    street: "123 Main Street",
    city: "Demo City",
    state: "Demo State",
    zip: "12345",
  },
];

export const Checkout = () => {
  const cartItems = useRecoilValue(cartAtom);

  return (
    <main className="checkout-main ">
      <h2 className="font-size-2rem" style={{letterSpacing:"0.3px",marginBottom:"0.5rem"}}>Select Address</h2>
      <div className="user-addresses">
        {demoAddress.map((address, index) => {
          return (
            <>
              <CheckoutAddress address={address} index={index} />
            </>
          );
        })}
      </div>
      <div className="user-orders-and-total ">
        {cartItems.map((item, index) => {
          return (
            <div key={index} className="user-order light-border">
              <div className="user-order-name-and-qty">
                <h1 className="font-size-2rem">
                  {item.oneProduct.description}
                </h1>
                <p style={{ fontSize: "1.5rem", fontWeight: "600" }}>
                  Qty : {item.qty}
                </p>
              </div>
              <div className="user-order-qty-total">
                <h2 className="font-size-2rem">
                  {item.qty && item.qty * item.oneProduct.price}
                </h2>
              </div>
            </div>
          );
        })}
        <CheckoutFooter />
      </div>
    </main>
  );
};
