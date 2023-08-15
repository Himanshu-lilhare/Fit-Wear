import axios from "axios";
import { serverLink } from "../../ServerLink";

export const getCart = async () => {
    const { data:data1 } = await axios.get(`${serverLink}/getCartItems`, {
        withCredentials: true,
      });
      return data1
};
