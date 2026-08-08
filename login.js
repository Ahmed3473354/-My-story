import { auth } from "./firebase.js";

import {
signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/12.2.1/firebase-auth.js";


let login = document.getElementById("login");


login.onclick = async function(){

let email = document.getElementById("email").value;

let password = document.getElementById("password").value;


try{

await signInWithEmailAndPassword(
auth,
email,
password
);

window.location.href = "admin.html";

}

catch(error){

console.log(error);
alert(error.message);

}

}
