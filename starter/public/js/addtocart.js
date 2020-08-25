import axios from "axios";
import { showAlert } from "./alert";

export const addToCart = async (productId) => {
  try {
    const res = await axios({
      method: "POST",
      url: "http://127.0.0.1:3000/api/v1/cart/add-to-cart",
      data: {
        productId,
      },
    });
    if ((res.data.status = "success")) {
      alert("Item added to cart");
    }
  } catch (err) {
    console.log(err);
    alert("error");
  }
};
