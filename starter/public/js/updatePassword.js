import axios from "axios";
import { showAlert } from "./alert";

export const updatePassword = async (
  passwordCurrent,
  password,
  passwordConfirm
) => {
  try {
    const res = await axios({
      method: "PATCH",
      url: "http://127.0.0.1:3000/api/v1/users/update-my-password",
      data: {
        passwordCurrent,
        password,
        passwordConfirm,
      },
    });

    if (res.data.status === "success") {
      alert("success");
      window.setTimeout(() => {
        location.assign("/change-password");
      }, 1500);
    }
  } catch (err) {
    alert(err.response.data.message);
  }
};
// export const logout = async () => {
//   try {
//     const res = await axios({
//       method: "GET",
//       url: "http://127.0.0.1:3000/api/v1/users/logout",
//     });
//     if ((res.data.status = "success")) {
//       // res.redirect('/');
//       location.reload(true);
//     }
//   } catch (err) {
//     console.log(err.response);
//     showAlert("error", "Error logging out! Try again.");
//   }
// };
