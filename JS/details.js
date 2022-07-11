import { getDatabase, ref, child, get, push, update, query, orderByChild, equalTo } from "https://www.gstatic.com/firebasejs/9.6.8/firebase-database.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.8/firebase-app.js";
import {getAuth,setPersistence,browserSessionPersistence} from "https://www.gstatic.com/firebasejs/9.6.8/firebase-auth.js";

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
const auth=getAuth(firebaseApp);
const db = ref(getDatabase());
const dbRef = getDatabase();
var array = "";
var from = "";
var to = "";
var cat = "";
var dep = "";
var arr = "";
var npass = "";
var npass1 = "";
var srem = "";
var isrem = "";
var total = "";
var rem = "";
var seat = "";
var pr = "";
var id = sessionStorage.getItem("id");
/**considering two arrays,because I have two type of categories seater and sleeper each consits 38,15 total seats respectively */
const arr1 = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15'];
const arr2 = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31', '32', '33', '34', '35', '36', '37', '38'];
var uid = sessionStorage.getItem("user");
var route = sessionStorage.getItem("route");
var bname=sessionStorage.getItem("bname");
document.getElementById("Travelname").innerHTML = "Travels:" + sessionStorage.getItem("bname");
const date = sessionStorage.getItem("date");

//*******************************************quering for bus details*************************** */
const busDetails = query(ref(dbRef, "buses/" + date), orderByChild("route"), equalTo(route));
get(busDetails).then(details => {
    if (details.exists()) {
        details.forEach(function (singledetail) {
            if(singledetail.ref._path.pieces_[2]==id){
            array = route.split("-");
            from = array[0];
            to = array[1];
            cat = singledetail.val().category;
            if (cat == "Ac Sleeper") {
                total = 15;
            }
            if (cat == "Ac seater") {
                total = 38;
            }
            dep = singledetail.val().starttime;
            arr = singledetail.val().endtime;
            srem = singledetail.val().totalseats;
            pr = singledetail.val().price;
            document.getElementById("source").innerHTML = "Source: <i>" + from + "<i>";
            document.getElementById("destination").innerHTML = "Destination: <i>" + to + "<i>";
            document.getElementById("category").innerHTML = "Category: " + cat;
            document.getElementById("deptime").innerHTML = dep;
            document.getElementById("arrtime").innerHTML = arr;
            sessionStorage.setItem("startp", from);
            sessionStorage.setItem("desp", to);
            sessionStorage.setItem("price", pr);
        }
        });
    }
});
//*******************************************end of quering for bus details*************************** */

//*******************************************event handling function for confirm button and updating db**************** */
const updating = async () => {
    var count=0;
    npass1 = document.getElementById("numpassengers");
    npass = parseInt(npass1.value);
    sessionStorage.setItem("npass", npass)
    isrem = parseInt(srem);
    rem = total-isrem;
    if (cat == "Ac Sleeper") {
        for (var i = rem;; i++) {
            if(count==npass)
                break;
            seat += arr1[i] +",";
            isrem -= 1;
            count++;
        }
    }
    if (cat == "Ac seater") {
        for (var i = rem;;i++) {
            if(count==npass)
                break;
            seat += arr2[i] +",";
            isrem -= 1;
            count++;
        }
    }
    seat=seat.slice(0,-1);
    const postData={
        "npass":npass,
        "seats":seat,
        "price":pr,
        "uid":uid,
        "route":route
    }
    //**adding booking details to the database by creating a new unique id  */
    const newPostKey=push(child(db,'bookings')).key;
    const updates={};
    updates['bookings/'+newPostKey]=postData;
    const x=update(db,updates);
    x.then(()=>{
        window.location.href="EndingPage.html";
    })
    x.catch((error)=>{
        window.alert("There is an Technical error,Please try after some time!!");
    })
    var total1 = isrem.toString();
    const busData={
        "totalseats":total1,
        "category":cat,
        "endtime":arr,
        "starttime":dep,
        "route":route,
        "price":pr,
        "name":bname
    }
    const update1={};
    //**updating bus details in database */
    update1['/buses/'+date+'/'+id]=busData;
    const y=update(db,update1);
    seat="";
}
//*******************************************end of event handling function for confirm button and updating db**************** */

//********************event listener for confirmation button************************ */
const cnfrmbut = document.getElementById("confirmbutton");
cnfrmbut.addEventListener("click", updating);
//********************end of event listener for confirmation button************************ */

//**************************************************changing state persistence******************* */
setPersistence(auth,browserSessionPersistence)
.catch((error)=>{
  console.log(error);
})
//*************************************************end of changing state persistence******************* */