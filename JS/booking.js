import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.8/firebase-app.js";
import {getAuth,onAuthStateChanged,setPersistence,browserSessionPersistence} from "https://www.gstatic.com/firebasejs/9.6.8/firebase-auth.js";
import { getDatabase, ref, get, query, orderByChild, equalTo } from "https://www.gstatic.com/firebasejs/9.6.8/firebase-database.js";

//initializing firebase
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
const db = getDatabase();
var btn="";
var btn1="";
var bname="";
var id="";
var array ="";
var idarr=" ";
var i=0;
/**
 * accessing the values stored in session
 */
var from=sessionStorage.getItem("from");
document.getElementById("source").innerHTML=from;
var to=sessionStorage.getItem("to");
document.getElementById("destination").innerHTML=to;
var date=sessionStorage.getItem("date");
document.getElementById("date").innerHTML=date;
var froml=from.toLowerCase();
var tol=to.toLowerCase();
var route=froml+"-"+tol;
sessionStorage.setItem("route",route)

//******************************Retriving bus details for databasse******************** */
/*
 * Here we are reteriving bus details from database according to the date passenger wants to travel 
 * database parent id is "buses" in that we are having child with id in sequence order and those buses will consists details like
 * busname,category,price,route(source-destination),starting time,reachtime,total no.of seats
 * make sure that the id of buses are different because they are important while modifying the total seats after succesful booking
*/
const busDetails = query(ref(db,"buses/"+date), orderByChild("route"), equalTo(route));
get(busDetails).then(details => {
  if (details.exists()) {
    details.forEach(function (singledetail) {
      i++;
      id+=singledetail.ref._path.pieces_[2]+" ";
      const route2 = singledetail.val().route;
      const array = route2.split("-");
      $("#details").append("<br><main style='display: table;border: 2px solid #fd8098; border-radius: 10px; width:95%'>"+
      "<div style='float:left;width:inherit;height:auto;'><b>&nbsp;&nbsp;&nbsp;" + singledetail.val().name +"(<i>"+singledetail.val().category+"</i>)"+
        "</b></div><div style='float:right; width:inherit;height:auto;text-align: right; margin-right:10px;'><label><b>Price:₹"
        + singledetail.val().price + "/-</b></label></div><div style='float:left; width:inherit;height:auto;' class='second'><label><b>&nbsp;&nbsp;&nbsp;"
        + array[0] + "</b></label><p style='color: grey;'>&nbsp;&nbsp;&nbsp;to</p><label><b>&nbsp;&nbsp;&nbsp;" +
        array[1] + "</b></label></div><div style='float:right; width:inherit;height:auto;margin-right:10px;margin-bottom:2px;' class='third' align=right>"+
        "<button type='button' class='btn my-2 my-sm-0 button cls' id='" + i + "'>BOOK BUS</button>"+"</div></main><br>")
        bname+=singledetail.val().name+"-";  
        /**
         * here I am saving bus names and bus id's into two different arrays so there can be used in future
         */
  });
  /*
   * Here I am adding the event listener for the buttons created in loop with the button id's since there are only two buses available
   * in my database.I am adding static listeners for them and calling functions accordingly 
  */
  btn=document.getElementById("1");
  btn.addEventListener("click",booking1);
  btn1=document.getElementById("2");
  btn1.addEventListener("click",booking2);
  }
});
//******************************end of retriving bus details for databasse******************** */

//**************************************functions for handling events********************* */
const booking1=()=>{
  array=bname.split("-");
  idarr=id.split(" ");
  //console.log(idarr[i-1]);
    onAuthStateChanged(auth, user => {
        /**checking if any user signed in or not */
        if (user) {
              sessionStorage.setItem("bname",array[0]);
              sessionStorage.setItem("id",idarr[0]);
              window.location.href = "detailspage.html";
            }
            else {
              sessionStorage.setItem("bname",array[0]);
              sessionStorage.setItem("id",idarr[0]);
              window.location.href = "Login.html";
            }
          });
}
const booking2=()=>{
  array=bname.split("-");
  idarr=id.split(" ");
    onAuthStateChanged(auth, user => {
        /**checking if any user signed in or not */
        if (user) {
              sessionStorage.setItem("bname",array[1]);
              sessionStorage.setItem("id",idarr[1]);
              window.location.href = "detailspage.html";
            }
            else {
              sessionStorage.setItem("bname",array[1]);
              sessionStorage.setItem("id",idarr[1]);
              window.location.href = "Login.html";
            }
          });
}
//**************************************functions for handling events********************* */

//**************Event handling for login button********************************* */
const btnloginm=document.getElementById("btnloginb")
btnloginm.addEventListener("click",()=>
{
  window.location.href = "Login.html";
  sessionStorage.setItem("booking","booking");
})
//**************end of Event handling for login button********************************* */

//**************************************************changing state persistence******************* */
setPersistence(auth,browserSessionPersistence)
.catch((error)=>{
  console.log(error);
})
//*************************************************end of changing state persistence******************* */