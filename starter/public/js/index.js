import "@babel/polyfill";
import { login, logout } from "./login";
import { Signup } from "./signup";
import { updateDetails } from "./updateUserDetails";
import { updatePassword } from "./updatePassword";
import { addToCart } from "./addtocart";
import Search from "./search";

const loginForm = document.querySelector(".form--login");
const SignupForm = document.querySelector(".form--signup");
const updateForm = document.querySelector(".form-details");
const updatePasswordForm = document.querySelector(".form-password");
const logOutBtn = document.querySelector(".logout-btn");
const addtocartBtn = document.querySelector(".cart-btn");

if (loginForm)
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = document.querySelector(".email").value;
    const password = document.querySelector(".password").value;
    login(email, password);
  });

if (SignupForm)
  SignupForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const firstName = document.getElementById("firstName").value;
    const lastName = document.getElementById("lastName").value;
    const email = document.getElementById("email").value;
    const phoneNumber = document.getElementById("phoneNumber").value;
    const password = document.getElementById("password").value;
    const passwordConfirm = document.getElementById("passwordConfirm").value;
    Signup(firstName, lastName, email, phoneNumber, password, passwordConfirm);
  });

if (updateForm)
  updateForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const firstName = document.getElementById("firstName").value;
    const lastName = document.getElementById("lastName").value;

    updateDetails(firstName, lastName);
  });

if (updatePasswordForm)
  updatePasswordForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const passwordCurrent = document.getElementById("passwordCurrent").value;
    const password = document.getElementById("password").value;
    const passwordConfirm = document.getElementById("passwordConfirm").value;

    updatePassword(passwordCurrent, password, passwordConfirm);
  });

if (logOutBtn) logOutBtn.addEventListener("click", logout);
if (addtocartBtn)
  addtocartBtn.addEventListener("click", function () {
    console.log("a");
  });
