"use client";
import "./checkout.css";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { addressAtom, cartAtom, cartTotal } from "store";

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
  const setAddress = useSetRecoilState(addressAtom);
  const finalTotal = useRecoilValue(cartTotal);

  return (
    <main className="checkout-main border">
      <div className="user-orders-and-total border">
        {cartItems.map((item,index) => {
          return (
            <div key={index} className="user-order border">
              <div className="user-order-name-and-qty">
                <h1>{item.oneProduct.name}</h1>
                <p>Qty : {item.qty}</p>
              </div>
              <div className="user-order-qty-total">
                <h2>{item.qty && item.qty * item.oneProduct.price}</h2>
              </div>
            </div>
          );
        })}
        <footer className="user-order-and-total-footer">
          <div className="final-total">
            <h2>You Have To Pay</h2>
            <h2>{finalTotal}</h2>
          </div>
          <button className="proceed-to-pay-button" >Proceed To Pay</button>
        </footer>
      </div>
      <div className="user-addresses">
        {demoAddress.map((address, index) => {
          return (
            <>
              <label key={index} htmlFor="address" className="address-label">
                <div>
                  <input
                    onChange={() => {
                      setAddress(address);
                    }}
                    type="radio"
                    name="address"
                    id={`address${index + 1}`}
                    value={`address${index + 1}`}
                  />
                </div>

                <div>
                  <p>{address.city}</p>
                  <p>{address.state}</p>
                  <p>{address.street}</p>
                  <p>{address.zip}</p>
                </div>
              </label>
            </>
          );
        })}
      </div>
    </main>
  );
};
