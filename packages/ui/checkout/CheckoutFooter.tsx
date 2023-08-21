import { useRecoilValue } from "recoil";
import { addressAtom, cartTotal } from "store";

export function CheckoutFooter(){
    const finalTotal = useRecoilValue(cartTotal);
    const address = useRecoilValue(addressAtom)


    function checkoutHandler(){
   
if(!address) {
    console.log(address)
    alert("Please Select Address")
}

    }

    return <footer className="user-order-and-total-footer">
    <div className="final-total">
      <h2 className="font-size-2rem">You Have To Pay</h2>
      <h2 className="font-size-2rem">{finalTotal}</h2>
    </div>
    <button onClick={checkoutHandler} className="proceed-to-pay-button purple-button" >Proceed To Pay</button>
  </footer>
}