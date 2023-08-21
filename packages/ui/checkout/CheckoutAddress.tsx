import { LoDashExplicitNumberArrayWrapper } from "lodash";
import { useSetRecoilState } from "recoil";
import { addressAtom } from "store";

interface props {
  address:{
    street: string;
    city: string;
    state: string;
    zip: string;
  },
  index : number
}
export function CheckoutAddress({ address, index }:props) {
  const setAddress = useSetRecoilState(addressAtom);
  return (
    <label key={index} htmlFor="address" className="address-label light-border">
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
  );
}
