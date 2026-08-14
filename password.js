"use strict";


/* =========================================
        FIREBASE IMPORTS
========================================= */

import {
    initializeApp
}
from
"https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";


import {
    getAuth,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    signOut
}
from
"https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";


import {
    getFirestore,
    collection,
    addDoc,
    getDocs,
    updateDoc,
    deleteDoc,
    doc,
    serverTimestamp,
    query,
    orderBy
}
from
"https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";


/* =========================================
        FIREBASE CONFIG
========================================= */

const firebaseConfig = {

    apiKey:
    "AIzaSyCYpUFyBaOByeByNrkeqR8ErT3K7r7TbKc",

    authDomain:
    "working-model-of-heart-251c4.firebaseapp.com",

    projectId:
    "working-model-of-heart-251c4",

    storageBucket:
    "working-model-of-heart-251c4.firebasestorage.app",

    messagingSenderId:
    "225784710105",

    appId:
    "1:225784710105:web:d6526ae93c57073e740fc8",

    measurementId:
    "G-HCTMP0Z38C"

};


/* =========================================
        INITIALIZE
========================================= */

const app =
initializeApp(firebaseConfig);


const auth =
getAuth(app);


const db =
getFirestore(app);


/* =========================================
        FIRESTORE COLLECTION
========================================= */

const LINKS_COLLECTION =
"projectMedia";


let currentUser = null;

let editingId = null;

let currentFilter = "all";

let allLinks = [];


/* =========================================
        ELEMENTS
========================================= */

const gallery =
document.getElementById(
    "gallery"
);

const empty =
document.getElementById(
    "galleryEmpty"
);

const hostMessage =
document.getElementById(
    "hostMessage"
);

const adminPanel =
document.getElementById(
    "adminPanel"
);

const hostLoginBox =
document.getElementById(
    "hostLogin"
);


/* =========================================
        MESSAGE
========================================= */

function message(
    text,
    success=false
){

    hostMessage.textContent =
    text;

    hostMessage.className =
    "host-message " +
    (
        success
        ? "ok"
        : ""
    );

}


/* =========================================
        LOAD LINKS
========================================= */

async function loadLinks(){

    try{

        const status =
        document.getElementById(
            "firebaseStatus"
        );


        if(status){

            status.textContent =
            "☁️ Loading project gallery...";

            status.className =
            "firebase-status";

        }


        const q =
        query(
            collection(
                db,
                LINKS_COLLECTION
            ),
            orderBy(
                "createdAt",
                "desc"
            )
        );


        const snapshot =
        await getDocs(q);


        allLinks = [];


        snapshot.forEach(
        item=>{

            const data =
            item.data();


            allLinks.push({

                id:item.id,

                title:
                data.title || "Untitled",

                type:
                data.type || "photo",

                url:
                data.url || ""

            });

        });


        renderGallery();


        renderManageList();


        if(status){

            status.textContent =
            "☁️ Live Firebase Gallery Connected";

            status.className =
            "firebase-status live";

        }


    }
    catch(error){

        console.error(
            "Firestore error:",
            error
        );


        const status =
        document.getElementById(
            "firebaseStatus"
        );


        if(status){

            status.textContent =
            "⚠️ Firebase connection failed";

        }

    }

}


/* =========================================
        RENDER GALLERY
========================================= */

function renderGallery(){

    gallery.innerHTML = "";


    const filtered =
    allLinks.filter(
    item=>{

        return (
            currentFilter === "all" ||
            item.type === currentFilter
        );

    });


    if(filtered.length === 0){

        empty.classList.add(
            "show"
        );

        return;

    }


    empty.classList.remove(
        "show"
    );


    filtered.forEach(
    item=>{

        const card =
        document.createElement(
            "div"
        );

        card.className =
        "gallery-item";


        const thumb =
        document.createElement(
            "div"
        );

        thumb.className =
        "gallery-thumb";


        if(item.type === "photo"){

            const img =
            document.createElement(
                "img"
            );

            img.src =
            item.url;

            img.alt =
            item.title;

            img.loading =
            "lazy";


            img.onerror =
            ()=>{

                thumb.innerHTML =
                "🖼️";

                thumb.style.fontSize =
                "50px";

                thumb.style.color =
                "#ff2638";

            };


            thumb.appendChild(
                img
            );

        }
        else{

            const videoIcon =
            document.createElement(
                "div"
            );

            videoIcon.className =
            "video-thumb";

            videoIcon.textContent =
            "▶";

            thumb.appendChild(
                videoIcon
            );

        }


        const caption =
        document.createElement(
            "div"
        );

        caption.className =
        "gallery-caption";

        caption.textContent =
        item.title;


        const type =
        document.createElement(
            "div"
        );

        type.className =
        "gallery-type";

        type.textContent =
        item.type === "photo"
        ? "📸 PHOTO"
        : "🎬 VIDEO";


        card.appendChild(
            thumb
        );

        card.appendChild(
            caption
        );

        card.appendChild(
            type
        );


        card.onclick =
        ()=>{
            openViewer(item);
        };


        gallery.appendChild(
            card
        );

    });

}


/* =========================================
        FILTER
========================================= */

window.setGalleryFilter =
function(type){

    currentFilter =
    type;

    renderGallery();

};


/* =========================================
        VIEW MEDIA
========================================= */

function openViewer(item){

    const viewer =
    document.getElementById(
        "sectionViewer"
    );

    const title =
    document.getElementById(
        "viewerTitle"
    );

    const content =
    document.getElementById(
        "viewerContent"
    );


    content.innerHTML = "";

    title.textContent =
    item.title;


    if(item.type === "photo"){

        const img =
        document.createElement(
            "img"
        );

        img.className =
        "viewer-image";

        img.src =
        item.url;

        img.alt =
        item.title;

        content.appendChild(
            img
        );

    }
    else{

        const video =
        document.createElement(
            "video"
        );

        video.className =
        "viewer-video";

        video.src =
        item.url;

        video.controls =
        true;

        video.autoplay =
        true;

        video.playsInline =
        true;

        content.appendChild(
            video
        );

    }


    viewer.classList.add(
        "show"
    );


    viewer.scrollIntoView({
        behavior:"smooth",
        block:"center"
    });

}


/* =========================================
        HOST LOGIN
========================================= */

window.hostLogin =
async function(){

    const email =
    document
    .getElementById(
        "hostEmail"
    )
    .value
    .trim();


    const password =
    document
    .getElementById(
        "hostPassword"
    )
    .value;


    if(!email){

        message(
            "Enter host email."
        );

        return;

    }


    if(!password){

        message(
            "Enter host password."
        );

        return;

    }


    try{

        message(
            "Checking login..."
        );


        await signInWithEmailAndPassword(
            auth,
            email,
            password
        );


        message(
            "✓ Host login successful.",
            true
        );


    }
    catch(error){

        console.error(error);


        message(
            "Incorrect email or password."
        );

    }

};


/* =========================================
        AUTH STATE
========================================= */

onAuthStateChanged(
auth,
user=>{

    currentUser =
    user;


    if(user){

        hostLoginBox.style.display =
        "none";


        adminPanel.classList.add(
            "show"
        );


        message(
            "✓ Host authenticated.",
            true
        );


        renderManageList();

    }
    else{

        hostLoginBox.style.display =
        "block";


        adminPanel.classList.remove(
            "show"
        );

    }

});


/* =========================================
        ADD / EDIT LINK
========================================= */

window.saveLink =
async function(){

    if(!currentUser){

        message(
            "Host login required."
        );

        return;

    }


    const title =
    document
    .getElementById(
        "linkTitle"
    )
    .value
    .trim();


    const type =
    document
    .getElementById(
        "linkType"
    )
    .value;


    const url =
    document
    .getElementById(
        "mediaLink"
    )
    .value
    .trim();


    if(!title){

        message(
            "Enter a title."
        );

        return;

    }


    if(!url){

        message(
            "Enter the image/video link."
        );

        return;

    }


    try{

        new URL(url);

    }
    catch{

        message(
            "Enter a valid URL."
        );

        return;

    }


    const button =
    document.getElementById(
        "saveLinkBtn"
    );


    button.disabled =
    true;


    try{

        if(editingId){

            await updateDoc(
                doc(
                    db,
                    LINKS_COLLECTION,
                    editingId
                ),
                {

                    title:title,

                    type:type,

                    url:url,

                    updatedAt:
                    serverTimestamp()

                }
            );


            message(
                "✓ Link updated.",
                true
            );


            editingId =
            null;


            button.textContent =
            "➕ Add Link";

        }
        else{

            await addDoc(
                collection(
                    db,
                    LINKS_COLLECTION
                ),
                {

                    title:title,

                    type:type,

                    url:url,

                    createdAt:
                    serverTimestamp(),

                    createdBy:
                    currentUser.uid

                }
            );


            message(
                "✓ Link added to Firebase.",
                true
            );

        }


        clearForm();


        await loadLinks();

    }
    catch(error){

        console.error(error);


        message(
            "Database operation failed."
        );

    }


    button.disabled =
    false;

};


/* =========================================
        CLEAR FORM
========================================= */

function clearForm(){

    document
    .getElementById(
        "linkTitle"
    )
    .value = "";


    document
    .getElementById(
        "mediaLink"
    )
    .value = "";


    document
    .getElementById(
        "linkType"
    )
    .value = "photo";


    editingId =
    null;


    document
    .getElementById(
        "saveLinkBtn"
    )
    .textContent =
    "➕ Add Link";

}


/* =========================================
        MANAGE LIST
========================================= */

function renderManageList(){

    const list =
    document.getElementById(
        "manageList"
    );


    if(!list) return;


    list.innerHTML = "";


    if(!currentUser){

        return;

    }


    if(allLinks.length === 0){

        list.innerHTML =
        '<div style="color:#777;font-size:12px;padding:10px 0">No links yet.</div>';

        return;

    }


    allLinks.forEach(
    item=>{

        const row =
        document.createElement(
            "div"
        );

        row.className =
        "manage-row";


        const name =
        document.createElement(
            "div"
        );

        name.className =
        "manage-name";

        name.textContent =
        (
            item.type === "photo"
            ? "📸 "
            : "🎬 "
        ) +
        item.title;


        const buttons =
        document.createElement(
            "div"
        );

        buttons.className =
        "manage-buttons";


        const edit =
        document.createElement(
            "button"
        );

        edit.textContent =
        "Edit";


        edit.onclick =
        ()=>{
            editLink(item);
        };


        const remove =
        document.createElement(
            "button"
        );

        remove.textContent =
        "Delete";


        remove.onclick =
        ()=>{
            deleteLink(item.id);
        };


        buttons.appendChild(
            edit
        );

        buttons.appendChild(
            remove
        );


        row.appendChild(
            name
        );

        row.appendChild(
            buttons
        );


        list.appendChild(
            row
        );

    });

}


/* =========================================
        EDIT
========================================= */

function editLink(item){

    editingId =
    item.id;


    document
    .getElementById(
        "linkTitle"
    )
    .value =
    item.title;


    document
    .getElementById(
        "linkType"
    )
    .value =
    item.type;


    document
    .getElementById(
        "mediaLink"
    )
    .value =
    item.url;


    document
    .getElementById(
        "saveLinkBtn"
    )
    .textContent =
    "💾 Update Link";


    message(
        "Editing: " +
        item.title,
        true
    );

}


/* =========================================
        DELETE
========================================= */

async function deleteLink(id){

    if(!currentUser){

        message(
            "Host login required."
        );

        return;

    }


    const confirmed =
    confirm(
        "Delete this link?"
    );


    if(!confirmed) return;


    try{

        await deleteDoc(
            doc(
                db,
                LINKS_COLLECTION,
                id
            )
        );


        message(
            "✓ Link deleted.",
            true
        );


        if(editingId === id){

            clearForm();

        }


        await loadLinks();

    }
    catch(error){

        console.error(error);


        message(
            "Delete failed."
        );

    }

}


/* =========================================
        LOGOUT
========================================= */

window.hostLogout =
async function(){

    try{

        await signOut(
            auth
        );


        clearForm();


        message(
            "Logged out.",
            true
        );


    }
    catch(error){

        console.error(error);

    }

};


/* =========================================
        INITIAL LOAD
========================================= */

loadLinks();