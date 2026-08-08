import { db } from "./firebase.js";

import {
    addDoc,
    collection,
    serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.2.1/firebase-firestore.js";


const form = document.getElementById("contactForm");

const result = document.getElementById("contactResult");


form.addEventListener("submit", async function(e) {

    e.preventDefault();


    const name =
        document.getElementById("contactName").value.trim();

    const email =
        document.getElementById("contactEmail").value.trim();

    const message =
        document.getElementById("contactMessage").value.trim();


    if (!name || !email || !message) {

        result.textContent = "⚠️ من فضلك املأ جميع البيانات.";

        return;
    }


   try {

    const docRef = await addDoc(
        collection(db, "messages"),
        {
            name: name,
            email: email,
            message: message,
            time: serverTimestamp()
        }
    );

    console.log("✅ تم الحفظ بنجاح");
    console.log("Document ID:", docRef.id);
    console.log("Collection: messages");

    result.textContent = "✅ تم إرسال الرسالة بنجاح";

    form.reset();

} catch (error) {

    console.error("❌ Firebase Error:", error);

    result.textContent = "❌ حدث خطأ أثناء إرسال الرسالة";
}

});