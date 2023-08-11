import { useRecoilValue } from "recoil";
import { cartTotal } from "store";

const CartTotal = () => {
  const total = useRecoilValue(cartTotal);

  return (
    <div>
      <h1>Total : {total} </h1>
    </div>
  );
};

export default CartTotal;
