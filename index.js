console.log("index.js اشتغل");

import { db } from "./firebase.js";

import {
addDoc,
collection,
getDocs,
getDoc,
query,
orderBy,
serverTimestamp,
doc,
updateDoc,
increment,
setDoc
} from "https://www.gstatic.com/firebasejs/12.2.1/firebase-firestore.js";

let rel = document.getElementById("rel");
let adv = document.getElementById("adv");
let baby = document.getElementById("baby");
let disc = document.getElementById("disc");
let hist = document.getElementById("hist");
let imag = document.getElementById("imag");


if(rel){
rel.addEventListener("click",function(){
    window.location.href = "rel.html";
});
}


if(adv){
adv.addEventListener("click",function(){
    window.location.href = "adv.html";
});
}


if(baby){
baby.addEventListener("click",function(){
    window.location.href = "baby.html";
});
}


if(disc){
disc.addEventListener("click",function(){
    window.location.href = "disc.html";
});
}


if(hist){
hist.addEventListener("click",function(){
    window.location.href = "hist.html";
});
}


if(imag){
imag.addEventListener("click",function(){
    window.location.href = "imag.html";
});
}

document.getElementById("favorite").addEventListener("click", function () {
    window.open("favorite.html");
});

let search = document.getElementById("search");
let cards = document.querySelectorAll(".card");

search.addEventListener("input", function(){

    let value = search.value.toLowerCase();

    cards.forEach(function(card){

        let title = card.textContent.toLowerCase();

        if(title.includes(value)){
            card.style.visibility = "visible";
        }
        else{
            card.style.visibility = "hidden";
        }

    });

});

let last = JSON.parse(localStorage.getItem("lastStory"));

if(last){

    document.getElementById("lastStory").innerHTML = `
        <h2>📖 أكمل القراءة</h2>

        <div class="card">

            <img src="${last.image}">

            <button onclick="window.open('${last.link}')">
                ${last.title}
            </button>

        </div>
    `;
}

let installBtn = document.getElementById("installBtn");

let installPrompt;

window.addEventListener("beforeinstallprompt", function(e){

    e.preventDefault();

    installPrompt = e;

    installBtn.style.display = "block";

});


installBtn.onclick = function(){

    installPrompt.prompt();

    installPrompt.userChoice.then(function(){

        installBtn.style.display = "none";

    });

};



/*
if ("serviceWorker" in navigator) {

navigator.serviceWorker.register("service-worker.js")
.then(function(){
    console.log("Service Worker يعمل");
})
.catch(function(error){
    console.log(error);
});

}
*/


const sendBtn = document.getElementById("sendComment");
const commentsDiv = document.getElementById("comments");

if (sendBtn && commentsDiv) {

async function loadComments(showAll = false) {

    commentsDiv.innerHTML = "";

    const q = query(
        collection(db, "comments"),
        orderBy("time", "desc")
    );

    const snapshot = await getDocs(q);

    let comments = [];

    snapshot.forEach((doc) => {

        comments.push(doc.data());

    });


    let displayComments = showAll ? comments : comments.slice(0, 3);


    displayComments.forEach((data) => {

        commentsDiv.innerHTML += `

        

        <div class="comment">
            <strong>${data.name}</strong><br>
            ${data.comment}
        </div>
        `;

    });


    const showBtn = document.getElementById("showAllComments");


    if(showBtn){

        if(comments.length > 3){

            showBtn.style.display = "block";

            showBtn.textContent = showAll 
            ? "⬆️ إخفاء التعليقات" 
            : "📖 عرض كل التعليقات";


            showBtn.onclick = function(){

                loadComments(!showAll);

            };

        }else{

            showBtn.style.display = "none";

        }

    }

}

sendBtn.onclick = async function () {

    const name = document.getElementById("name").value || "زائر";
    const comment = document.getElementById("comment").value;

    if(comment.trim() === "") return;


    await addDoc(collection(db, "comments"), {
        name: name,
        comment: comment,
        time: serverTimestamp()
    });


    document.getElementById("comment").value = "";

    loadComments();

};


loadComments(false);

}

async function addVisitor(){

    const visitorRef = doc(db,"stats","visitors");

    const snap = await getDoc(visitorRef);

    if(snap.exists()){

        await updateDoc(visitorRef,{
            
            count: increment(1)
            
        });



    }else{

        await setDoc(visitorRef,{
            count: 1
        });

    }

}

addVisitor()
.then(() => {
    console.log("تمت زيادة الزائر");
})
.catch((error) => {
    console.log("خطأ العداد:", error);
});

async function showVisitors(){

    const visitorRef = doc(db,"stats","visitors");

    const snap = await getDoc(visitorRef);

    if(snap.exists()){

        document.getElementById("visitorCount").textContent =
        snap.data().count;

    }

}

let privacyBtn = document.getElementById("privacyBtn");

if (privacyBtn) {
    privacyBtn.addEventListener("click", function () {
        window.location.href = "privacy.html";
    });
}

let about = document.getElementById("about") 
let conect = document.getElementById("conect")
about.addEventListener("click", function(){
    window.open("about.html")
})

conect.addEventListener("click",function(){
    window.open("contact")
})

showVisitors();