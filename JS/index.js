// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.8/firebase-app.js";
import {getAuth,setPersistence,browserSessionPersistence} from "https://www.gstatic.com/firebasejs/9.6.8/firebase-auth.js";

//initializing Firebase
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
sessionStorage.setItem("auth",auth);


 //*************Restricting dates according to the database *****************/
//  var from ="";
//  var to="";
//  var dd ="";
//  $('#date').attr('min', "2022-03-18");
//  $('#date').attr('max', "2022-03-19");
 //*************END Restricting dates according to the database****************/

//********************EVENT LISTENING FOR search button in Index page */
 
const btnloginm=document.getElementById("btnloginm")
btnloginm.addEventListener("click",()=>{window.location.href = "Login.html"})
 const searchstart=async()=> {
  from= source1.value;
  to = destination1.value;
  dd= date.value;
     if (from== "" && to== "" && dd == "") {
        window.alert("Please Fill out all fiels ")
     }
     else {
      from= source1.value;
      to = destination1.value;
      dd= date.value;
      sessionStorage.setItem("from",from);
      sessionStorage.setItem("to",to);
      sessionStorage.setItem("date",dd);
      window.location.href = "booking.html"
     }
 } 
 var btnsearch=document.getElementById("btnsearch");
 btnsearch.addEventListener("click", searchstart)
//********************EVENT LISTENING FOR search button in Index page */

//**login button event handling */
var loginm=document.getElementById("btnloginm");
loginm.addEventListener("click",()=>{
  window.location.href="Login.html";
  sessionStorage.setItem("index","index")
})
//**End login button event handling */

//**************************************************changing state persistence******************* */
setPersistence(auth,browserSessionPersistence)
.catch((error)=>{
  console.log(error);
})
//*************************************************End of changing state persistence******************* */