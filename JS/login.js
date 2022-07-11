import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.8/firebase-app.js";
import {getAuth,RecaptchaVerifier,signInWithPhoneNumber} from "https://www.gstatic.com/firebasejs/9.6.8/firebase-auth.js";


//initializing
const firebaseApp = initializeApp({
    apiKey: "[Your api key]",
    authDomain: "[Your auth domain key]",
    databaseURL: "[Your database url]",
    projectId: "[Your project Id]",
    storageBucket: "[Your storage bucket id]",
    messagingSenderId: "[Your message sender id since this project is using phone authentication]",
    appId: "[Your App Id ]",
    measurementId: "[Your measurement id]"
});
const auth = getAuth(firebaseApp);
const countrycode="Your country code"/**Please change this according to your country telephone code */

//************************mobile verification and loging in************/

$("#otpVerification").hide();
  $("#btnlogin").hide();
  window.recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {}, auth);
  recaptchaVerifier.render().then((widgetId) => {
    window.recaptchaWidgetId = widgetId;
  });

const sendVerificationCode=async()=>{
const pnumber=phone.value;
sessionStorage.setItem("pnumber",pnumber);
const appVerifier=window.recaptchaVerifier;
signInWithPhoneNumber(auth,countrycode+pnumber, appVerifier)
  .then((confirmationResult) => {
    // SMS sent. Prompt user to type the code from the message, then sign the
    // user in with confirmationResult.confirm(code).
    window.confirmationResult = confirmationResult;
    $("#otpVerification").show();
    $("#btnlogin").show();
    $("#btngenotp").hide();
    $("#recaptcha-container").hide();
    window.alert("OTP SENT SUCCESSFULLY!");
  }).catch((error) => {
    window.recaptchaVerifier.render().then(function(widgetId) {
      grecaptcha.reset(widgetId);
      window.location.reload();
    });
  });
}
const signingin=async()=>{
const code=otp.value;
window.confirmationResult.confirm(code).then((result) => {
  // User signed in successfully.
  const user = result.user.uid;
  sessionStorage.setItem("user",user);
  if(sessionStorage.getItem("index")=="index"){
    window.location.href="index.html"
  }
  else if(sessionStorage.getItem("booking")=="booking"){
    window.location.href="booking.html"
  }
  else{
  window.location.href="detailspage.html"
  }
}).catch((error) => {
  window.alert("Please,enter valid otp");
  document.getElementById("otp").innerHTML="";
});
}
btngenotp.addEventListener("click",sendVerificationCode);
btnlogin.addEventListener("click",signingin);

//****************************End of verification and loging in********/