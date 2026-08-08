import { db, auth } from "./firebase.js";

import {
    collection,
    getDocs,
    query,
    orderBy,
    deleteDoc,
    doc
} from "https://www.gstatic.com/firebasejs/12.2.1/firebase-firestore.js";

import {
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.2.1/firebase-auth.js";

import { signOut } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-auth.js";

document.getElementById("logout").onclick = async function () {

    await signOut(auth);

    window.location.href = "login.html";

};

onAuthStateChanged(auth, (user) => {

    if (!user) {
        window.location.href = "login.html";
        return;
    }

    console.log("Admin UID:", user.uid);
    console.log("Admin Email:", user.email);

    loadAdminComments();
    loadMessages();
});

const adminComments = document.getElementById("adminComments");

async function loadAdminComments() {

    adminComments.innerHTML = "";

    const q = query(
        collection(db, "comments"),
        orderBy("time", "desc")
    );

    const snapshot = await getDocs(q);

    snapshot.forEach((item) => {

        const data = item.data();

        adminComments.innerHTML += `
            <div class="comment">

                <strong>👤 ${data.name || "زائر"}</strong>

                <br><br>

                💬 ${data.comment}

                <br><br>

                <button class="deleteComment" data-id="${item.id}">
                    🗑️ حذف
                </button>

            </div>
        `;

    });

    const deleteButtons = document.querySelectorAll(".deleteComment");

    deleteButtons.forEach((button) => {

        button.addEventListener("click", async function () {

            const confirmDelete = confirm("هل تريد حذف هذا التعليق؟");

            if (!confirmDelete) return;

            const id = button.dataset.id;

            try {

                await deleteDoc(doc(db, "comments", id));

                loadAdminComments();

            } catch (error) {

                console.error(error);
                alert("حدث خطأ أثناء حذف التعليق.");

            }

        });

    });

}
const messagesList = document.getElementById("messagesList");

async function loadMessages() {

    if (!messagesList) return;

    messagesList.innerHTML = "⏳ جاري تحميل الرسائل...";

    try {

        const q = query(
            collection(db, "messages"),
            orderBy("time", "desc")
        );

        const snapshot = await getDocs(q);

        messagesList.innerHTML = "";

        if (snapshot.empty) {

            messagesList.innerHTML =
                "<p>📭 لا توجد رسائل حتى الآن.</p>";

            return;
        }


        snapshot.forEach((item) => {

            const data = item.data();

            const messageBox = document.createElement("div");

            messageBox.className = "admin-message";


            messageBox.innerHTML = `

                <h3>👤 ${data.name}</h3>

                <p>
                    📧 ${data.email}
                </p>

                <p>
                    💬 ${data.message}
                </p>

                <button class="delete-message">
                    🗑️ حذف الرسالة
                </button>

            `;


            const deleteBtn =
                messageBox.querySelector(".delete-message");


            deleteBtn.onclick = async function () {

                const confirmDelete =
                    confirm("هل تريد حذف هذه الرسالة؟");

                if (!confirmDelete) return;


                try {

                    await deleteDoc(
                        doc(db, "messages", item.id)
                    );

                    messageBox.remove();

                    console.log("تم حذف الرسالة");

                } catch (error) {

                    console.error(
                        "خطأ في حذف الرسالة:",
                        error
                    );

                    alert(
                        "❌ لم يتم حذف الرسالة"
                    );
                }

            };


            messagesList.appendChild(messageBox);

        });


    } catch (error) {

        console.error(
            "خطأ في تحميل الرسائل:",
            error
        );

        messagesList.innerHTML =
            "❌ حدث خطأ أثناء تحميل الرسائل.";
    }

}

