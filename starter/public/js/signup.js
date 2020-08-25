import axios from "axios";
import { showAlert } from "./alert";

export const Signup = async (
  firstName,
  lastName,
  email,
  phoneNumber,
  password,
  passwordConfirm
) => {
  try {
    const res = await axios({
      method: "POST",
      url: "http://127.0.0.1:3000/api/v1/users/signup",
      data: {
        firstName,
        lastName,
        email,
        phoneNumber,
        password,
        passwordConfirm,
      },
    });

    if (res.data.status === "success") {
      alert("success", "Signed up successfully!");
      window.setTimeout(() => {
        location.assign("/shop");
      }, 1500);
    }
  } catch (err) {
    alert(err.response.data.message);
  }
};
